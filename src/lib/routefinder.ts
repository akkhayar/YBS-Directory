import { PriorityQueue } from "typescript-collections";
import type { BusStop } from "./db.d";

type DistanceMap = { [key: string]: number };

enum CostType {
    Distance = "distance",
    Time = "time",
    Fare = "fare",
    Transfers = "transfers",
}

// Node Class
class Node {
    constructor(
        public busStop: BusStop,
        public parent: Node | null = null,
        public g: number = 0,
        public h: number = 0,
    ) {}

    get f(): number {
        return this.g + this.h;
    }
}

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

    enqueue(element: T): boolean {
        const added = super.enqueue(element);
        if (added) {
            this.elementsSet.add(this.elementIdentifier(element));
        }
        return added;
    }

    dequeue(): T | undefined {
        const element = super.dequeue();
        if (element !== undefined) {
            this.elementsSet.delete(this.elementIdentifier(element));
        }
        return element;
    }

    contains(element: T): boolean {
        return this.elementsSet.has(this.elementIdentifier(element));
    }
}

function calculateTime(distance: number) {
    return distance;
}

const distanceCosts: DistanceMap = {
    // 'smallerID-largerID': distance,
    // Populate with actual distances
};

const stopNeighbors: { [stopId: number]: BusStop[] } = {
    // Populate this based on bus lines and walking distance calculations
    // Example:
    // 1: [BusStop2, BusStop3], // BusStop1 is directly connected to BusStop2 and BusStop3
    // 2: [BusStop1, BusStop4],
    // ...
};

// TransitPathFinder Class
export class TransitPathFinder {
    closedSet: Set<string>;
    openSet: ExtendedPriorityQueue<Node>;
    distances: DistanceMap;
    goal: BusStop;
    stopNeighbors: { [stopId: string]: BusStop[] };
    walkingDistanceThreshold: number = 0.5; // Kilometers

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

    heuristic(start: BusStop): number {
        const startIdNum = parseInt(start.id);
        const goalIdNum = parseInt(this.goal.id);
        const key =
            startIdNum < goalIdNum
                ? `${start.id}-${this.goal.id}`
                : `${this.goal.id}-${start.id}`;
        return this.distances[key] || Number.MAX_VALUE;
    }

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

        return [];
    }

    constructPath(goalNode: Node): BusStop[] {
        const path: BusStop[] = [];
        let current: Node | null = goalNode;
        while (current) {
            path.unshift(current.busStop);
            current = current.parent;
        }
        return path;
    }

    getNeighbors(busStop: BusStop): BusStop[] {
        return this.stopNeighbors[busStop.id] || [];
    }

    getTravelCost(start: BusStop, end: BusStop, costType: CostType): number {
        const isWalking =
            this.calculateWalkingDistance(start, end) <=
            this.walkingDistanceThreshold;

        // disable walking
        if (isWalking && false) {
            switch (costType) {
                case CostType.Time:
                    return this.calculateWalkingTime(start, end);
                case CostType.Distance:
                    return this.calculateWalkingDistance(start, end);
                default:
                    return 0;
            }
        } else {
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

    calculateWalkingDistance(start: BusStop, end: BusStop): number {
        // TODO: Implement Haversine formula to calculate the distance
        return Number.MAX_VALUE;
    }

    calculateWalkingTime(start: BusStop, end: BusStop): number {
        // TODO: Calculate time based on walking speed and distance
        return Number.MAX_VALUE;
    }
}

// const finder = new TransitPathFinder(busStopDistances, goalStop, stopNeighbors);
// const path = finder.findPath(startStop, CostType.Time);
