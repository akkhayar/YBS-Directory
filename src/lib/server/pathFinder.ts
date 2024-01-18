import { PriorityQueue } from "typescript-collections";
import type {
    BusLineGeoJSON,
    BusStop,
    TransitPathSegment,
    TransitPath,
} from "$lib/database.d";
import { getAllBusLines, getBusStop, referenceTransitDistance, getTransitNeighbors, isSingleTransit } from "$lib/server/database";

export type DistanceMap = { [key: string]: number };

export enum CostType {
    Distance = "distance",
    Time = "time",
    Fare = "fare",
    Transfers = "transfers",
}

// Node class for representing a state in the A* algorithm
class Node {
    constructor(
        public busStop: BusStop,
        public parent: Node | null = null,
        public g: number = 0, // Cost from start to this node
        public h: number = 0, // Heuristic cost estimate from this node to goal
    ) {}

    // Total cost (f) is the sum of g and h
    get f(): number {
        return this.g + this.h;
    }
}

/**
 * Extended priority queue to keep track of the objects queued
 * with a 'contains' method to check for if an object is included.
 */
class ExtendedPriorityQueue<T> extends PriorityQueue<T> {
    private elementsSet: Set<string>;
    private elementIdentifier: (element: T) => string;

    constructor(
        comparator: (a: T, b: T) => number,
        elementIdentifier: (element: T) => string,
    ) {
        super(comparator);
        this.elementsSet = new Set<string>();
        this.elementIdentifier = elementIdentifier;
    }

    // Override enqueue to track elements
    enqueue(element: T): boolean {
        const added = super.enqueue(element);
        if (added) {
            this.elementsSet.add(this.elementIdentifier(element));
        }
        return added;
    }

    // Override dequeue to keep track of elements
    dequeue(): T | undefined {
        const element = super.dequeue();
        if (element !== undefined) {
            this.elementsSet.delete(this.elementIdentifier(element));
        }
        return element;
    }

    // Check if an element is in the priority queue
    contains(element: T): boolean {
        return this.elementsSet.has(this.elementIdentifier(element));
    }
}

type CostMap = {
    [cost in CostType]: number;
};

type TransitPathFinderConfig = {
    calculatedBusStopDistance: (stop1: BusStop, stop2: BusStop) => Promise<number>;
    calculatedBusLineScore: (busLine: BusLineGeoJSON) => number;
    costKresuWeights: CostMap; // Weights for each of the cost factors to consider
    walkingDistanceThreshold: number;
};

// Function to calculate the time based on distance
function calculateTime(distance: number) {
    return distance;
}

const DEFAULT_CONFIG: TransitPathFinderConfig = {
    calculatedBusStopDistance: async (stopA, stopB) => await referenceTransitDistance(stopA.id, stopB.id, ''),
    calculatedBusLineScore: () => 0,
    costKresuWeights: {
        distance: 1.1,
        fare: 0.5,
        time: 1.2,
        transfers: 10,
    },
    walkingDistanceThreshold: 2,
};

/**
 * A* based pathfinding algorithm for transit network.
 */
export class TransitPathFinder {
    config: TransitPathFinderConfig;
    goal: BusStop;
    closedSet: Set<string>;
    openSet: ExtendedPriorityQueue<Node>;

    constructor(
        goal: BusStop,
        config: TransitPathFinderConfig = DEFAULT_CONFIG,
    ) {
        this.config = config;
        this.goal = goal;
        this.openSet = new ExtendedPriorityQueue<Node>(
            (a, b) => a.f - b.f,
            (node: Node) => node.busStop.id,
        );
        this.closedSet = new Set<string>();
    }

    /**
     *  Heuristic function to estimate the cost from start to goal
     *
     * @param start - the starting bus stop
     * @returns
     */
    async heuristic(start: BusStop) {
        return await this.config.calculatedBusStopDistance(start, this.goal);
    }

    // Main method to find the path from start to goal
    async findPath(start: BusStop): Promise<TransitPath | undefined> {
        this.openSet.enqueue(new Node(start));

        while (!this.openSet.isEmpty()) {
            const current = this.openSet.dequeue()!;

            // Goal is reached
            if (current.busStop.id === this.goal.id) {
                return this.constructPath(current);
            }

            this.closedSet.add(current.busStop.id);

            for (const neighborStop of this.getNeighbors(current.busStop)) {
                if (this.closedSet.has(neighborStop.id)) {
                    continue;
                }

                const gScore =
                    current.g +
                    await this.getTravelCost(current.busStop, neighborStop);

                const neighborNode = new Node(
                    neighborStop,
                    current,
                    gScore,
                    await this.heuristic(neighborStop),
                );

                // Add neighbor to open set if not present, or update cost if cheaper path found
                if (
                    !this.openSet.contains(neighborNode) ||
                    gScore < neighborNode.g
                ) {
                    neighborNode.parent = current;
                    neighborNode.g = gScore;
                    if (!this.openSet.contains(neighborNode)) {
                        this.openSet.enqueue(neighborNode);
                    }
                }
            }
        }
    }

    // Construct the transit path from the goal node to the start node
    async constructPath(goalNode: Node): Promise<TransitPath> {
        const pathStops: BusStop[] = [];
        let current: Node | null = goalNode;
        // Back trace to construct the stops
        while (current) {
            pathStops.unshift(current.busStop);
            current = current.parent;
        }

        const segments: TransitPathSegment[] = [];
        let totalDistance = 0;
        let totalTime = 0;

        for (let i = 0; i < pathStops.length - 1; i++) {
            const startStop = pathStops[i];
            const endStop = pathStops[i + 1];
            const busLines = Object.values(getAllBusLines()).filter(
                (busLine) =>
                    busLine.metadata.stops.includes(startStop.id) &&
                    busLine.metadata.stops.includes(endStop.id),
            );

            const optimalBusLine = busLines.reduce((prev, current) =>
                this.config.calculatedBusLineScore(prev) >
                this.config.calculatedBusLineScore(current)
                    ? prev
                    : current,
            );
            const distance = await this.config.calculatedBusStopDistance(
                startStop,
                endStop,
            );
            const segment: TransitPathSegment = {
                startStop,
                endStop,
                busLine: optimalBusLine,
                distance,
                estimatedTime: calculateTime(distance),
                isWalking: false, // TODO: Update logic
            };

            if (
                segments.length > 0 &&
                busLines.includes(segments[segments.length - 1].busLine!)
            ) {
                const prevSegment = segments[segments.length - 1];
                prevSegment.endStop = endStop;
                prevSegment.distance += segment.distance;
                prevSegment.estimatedTime += segment.estimatedTime;
                continue;
            } else {
                segments.push(segment);
            }

            totalDistance += segment.distance;
            totalTime += segment.estimatedTime;
        }

        return {
            segments,
            totalDistance,
            totalTime,
        };
    }

    // Get neighboring bus stops for a given stop
    getNeighbors(busStop: BusStop): BusStop[] {
        return getTransitNeighbors(busStop.id).map(id => getBusStop({busStopId: id }));
    }

    // Calculate the travel cost between two stops based on the weight table
    async getTravelCost(start: BusStop, end: BusStop) {
        const distance = await this.config.calculatedBusStopDistance(start, end);

        const travelCosts: CostMap = {
            distance: distance,
            fare: 300,
            time: calculateTime(distance),
            transfers: isSingleTransit(start.id, end.id) ? 1 : 0,
        };

        const totalCost = Object.entries(travelCosts).reduce(
            (a, [key, value]) =>
                a + value * this.config.costKresuWeights[key as CostType],
            0,
        );
        return totalCost;
    }
}
