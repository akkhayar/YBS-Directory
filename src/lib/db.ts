import busStopsJSON from "$lib/data/busStops.json";
import busLinesMetadata from "$lib/data/routes/metadata.json";
import type { BusLineGeoJSON, BusStop } from "$lib/db.d";
import fs from "fs";

const BUSSTOPS: { [busStopID: string]: BusStop } = busStopsJSON;

const busStopValues = Object.values(BUSSTOPS);

const busLines: { [busLine: string]: BusLineGeoJSON } = {};
for (const busLine of busLinesMetadata.busLines) {
    const geojson = fs.readFileSync(
        `src/lib/data/routes/${busLine}.json`,
        "utf8",
    );

    try {
        busLines[busLine] = JSON.parse(geojson) as BusLineGeoJSON;
    } catch (e) {
        console.error(`Error parsing ${busLine}.json`);
    }
}

export function getAllBusLines() {
    return busLines;
}

export function getBusLine(busLine: string) {
    if (!busLinesMetadata.busLines.includes(busLine)) {
        return undefined;
    }
    // read geojson file 'YBS-${busLine}.geojson'
    const geojson = fs.readFileSync(
        `src/lib/data/routes/YBS-${busLine}.json`,
        "utf8",
    );
    return JSON.parse(geojson) as BusLineGeoJSON;
}

export function getAllBusStops() {
    return BUSSTOPS;
}

export function getBusStop(query: {
    busStopID?: string;
    busStopName?: string;
}): BusStop {
    query.busStopID = query.busStopID?.toUpperCase();
    if (query.busStopID) {
        return BUSSTOPS[query.busStopID];
    } else if (query.busStopName) {
        const busStop = busStopValues.find(
            (stop) => stop.name_en === query.busStopName,
        );
        if (!busStop) {
            throw new Error("Bus stop not found");
        }
        return busStop;
    } else {
        throw new Error("Invalid query");
    }
}
