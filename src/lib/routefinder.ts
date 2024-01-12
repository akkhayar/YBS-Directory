import { PriorityQueue } from "typescript-collections";
import type { BusStop } from "./db.d";

type DistanceMap = { [key: string]: number };

enum CostType {
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

// Extended priority queue to include a 'contains' method
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

// Function to calculate the time based on distance
function calculateTime(distance: number) {
    return distance;
}

// Define distance costs between stops
const distanceCosts: DistanceMap = {
    // 'smallerID-largerID': distance,
};

// Define neighbors for each stop
const stopNeighbors: { [stopId: number]: BusStop[] } = {
    // ... populate based on bus lines and walking distance ...
};

// Class for performing A* pathfinding in a transit network
export class TransitPathFinder {
    closedSet: Set<string>;
    openSet: ExtendedPriorityQueue<Node>;
    distances: DistanceMap;
    goal: BusStop;
    stopNeighbors: { [stopId: string]: BusStop[] };
    walkingDistanceThreshold: number = 0.5; // Kilometers for walkable distance

    constructor(
        distances: DistanceMap,
        goal: BusStop,
        stopNeighbors: { [stopId: string]: BusStop[] },
    ) {
        this.openSet = new ExtendedPriorityQueue<Node>(
            (a, b) => b.f - a.f,
            (node: Node) => node.busStop.id,
        );
        this.closedSet = new Set<string>();
        this.distances = distances;
        this.goal = goal;
        this.stopNeighbors = stopNeighbors;
    }

    // Heuristic function to estimate the cost from start to goal
    heuristic(start: BusStop): number {
        const startIdNum = parseInt(start.id);
        const goalIdNum = parseInt(this.goal.id);
        const key =
            startIdNum < goalIdNum
                ? `${start.id}-${this.goal.id}`
                : `${this.goal.id}-${start.id}`;
        return this.distances[key] || Number.MAX_VALUE;
    }

    // Main method to find the path from start to goal
    findPath(start: BusStop, costType: CostType): BusStop[] {
        this.openSet.enqueue(new Node(start));

        while (!this.openSet.isEmpty()) {
            const current = this.openSet.dequeue()!;

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
                    this.getTravelCost(current.busStop, neighborStop, costType);
                const neighborNode = new Node(
                    neighborStop,
                    current,
                    gScore,
                    this.heuristic(neighborStop),
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

        // Return an empty array if no path is found
        return [];
    }

    // Construct the path from the goal node to the start node
    constructPath(goalNode: Node): BusStop[] {
        const path: BusStop[] = [];
        let current: Node | null = goalNode;
        while (current) {
            path.unshift(current.busStop);
            current = current.parent;
        }
        return path;
    }

    // Get neighboring bus stops for a given stop
    getNeighbors(busStop: BusStop): BusStop[] {
        return this.stopNeighbors[busStop.id] || [];
    }

    // Calculate the travel cost between two stops based on the specified cost type
    getTravelCost(start: BusStop, end: BusStop, costType: CostType): number {
        const isWalking =
            this.calculateWalkingDistance(start, end) <=
            this.walkingDistanceThreshold;

        // Check if walking is an option and calculate cost accordingly
        if (isWalking) {
            switch (costType) {
                case CostType.Time:
                    return this.calculateWalkingTime(start, end);
                case CostType.Distance:
                    return this.calculateWalkingDistance(start, end);
                default:
                    return 0;
            }
        } else {
            // Use pre-defined costs for bus travel
            const startIdNum = parseInt(start.id);
            const endIdNum = parseInt(end.id);
            const key =
                startIdNum < endIdNum
                    ? `${start.id}-${end.id}`
                    : `${end.id}-${start.id}`;

            switch (costType) {
                case CostType.Distance:
                    return distanceCosts[key] || Number.MAX_VALUE;
                case CostType.Time:
                    return (
                        calculateTime(distanceCosts[key]) || Number.MAX_VALUE
                    );
                // ... handle other cost types ...
                default:
                    return Number.MAX_VALUE;
            }
        }
    }

    // Placeholder for calculating walking distance
    calculateWalkingDistance(start: BusStop, end: BusStop): number {
        // TODO: Implement Haversine formula or similar
        return Number.MAX_VALUE;
    }

    // Placeholder for calculating walking time
    calculateWalkingTime(start: BusStop, end: BusStop): number {
        // TODO: Calculate time based on walking speed and distance
        return Number.MAX_VALUE;
    }
}

// const finder = new TransitPathFinder(busStopDistances, goalStop, stopNeighbors);
// const path = finder.findPath(startStop, CostType.Time);
