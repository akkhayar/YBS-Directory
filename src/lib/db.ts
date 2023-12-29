import busLinesJSON from "$lib/data/busLines.json";
import busStopsJSON from "$lib/data/busStops.json";

export type BusStop = {
    id: number;
    name: string;
    address?: string;
    latitude: number;
    longitude: number;
};

export type BusStops = {
    index: {
        [name: string]: string;
    };
    busStops: {
        [id: string]: BusStop;
    };
};

export type BusLine = {
    id: number;
    busLineId: string;
    firstStopId: string;
    lastStopId: string;
    stops: string[];
};

export type BusLines = {
    [busLineId: string]: BusLine;
};

export const BUSLINES: BusLines = busLinesJSON;
export const BUSSTOPS: BusStops = busStopsJSON;
