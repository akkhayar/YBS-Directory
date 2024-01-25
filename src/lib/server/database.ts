import busStopsJSON from "$lib/data/busStops.json";
import busLinesMetadata from "$lib/data/routes/metadata.json";
import fs from "fs";
import type { BusLineGeoJSON, BusStop, Transit } from "$lib/database.d";
import { keyOf, getTransitDistance } from "$lib/server/preprocessor";

const BUSSTOPS: { [busStopID: string]: BusStop } = busStopsJSON;

const busStopValues = Object.values(BUSSTOPS);

const busLines: { [busLine: string]: BusLineGeoJSON } = {};

for (const busLine of busLinesMetadata.busLines) {
    const geojson = fs.readFileSync(
        `src/lib/data/routes/${busLine}.geojson`,
        "utf8",
    );

    try {
        const data = JSON.parse(geojson) as BusLineGeoJSON;
        busLines[data.metadata.route_id] = data;
    } catch (e) {
        console.error(`Error parsing ${busLine}.geojson`);
    }
}

// const transitNetworkCSV = fs.readFileSync(
//     `src/lib/data/transitNetwork.csv`,
//     "utf8",
// );
const transitNetworkCSV = '';

export const transitNetwork: { [id: string]: Transit } = {};
let headers: string[];

const transitIndex: {
    neighboring: {
        [a: string]: string[];
    };
    singleTransits: {
        [key: string]: number;
    };
} = { neighboring: {}, singleTransits: {} };

console.log("Loading transit network file.");
transitNetworkCSV.split("\n").forEach((row, index) => {
    if (index === 0) {
        headers = row.trimEnd().split(",");
        return;
    }
    const values = row.trimEnd().split(",");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rowObj: { [key: string]: any } = {};
    headers.reduce((obj, cur, idx) => {
        obj[cur] = values[idx];
        return obj;
    }, rowObj);

    const transitRow = rowObj as Transit;

    transitNetwork[keyOf(transitRow.a, transitRow.b) + transitRow.busLineId] =
        transitRow;

    // setup non busline specific transit row data for the first
    // encounter
    if (
        !Object.keys(transitNetwork).includes(keyOf(transitRow.a, transitRow.b))
    ) {
        transitNetwork[keyOf(transitRow.a, transitRow.b)] = transitRow;
    }

    if (transitIndex.neighboring[transitRow.a]) {
        transitIndex.neighboring[transitRow.a].push(transitRow.b);
    } else {
        transitIndex.neighboring[transitRow.a] = [transitRow.b];
    }
    if (transitIndex.neighboring[transitRow.b]) {
        transitIndex.neighboring[transitRow.b].push(transitRow.a);
    } else {
        transitIndex.neighboring[transitRow.b] = [transitRow.a];
    }

    transitIndex.singleTransits[keyOf(transitRow.a, transitRow.b)] = 1;
});
console.log("Transit network file loaded.");

export async function referenceTransitDistance(
    stopAId: string,
    stopBId: string,
    busLineId: string,
) {
    const index = keyOf(stopAId, stopBId) + busLineId;
    if (!Object.keys(transitNetwork).includes(index)) {
        const distance = await getTransitDistance(stopAId, stopBId);
        transitNetwork[index] = {a: stopAId, b: stopBId, distance, busLineId: busLineId};
        // throw Error(`Bus stops ${stopAId} and ${stopBId} do not have a distance value.`);
    }
    return transitNetwork[index].distance;
}

export function getTransitNeighbors(stopId: string) {
    return transitIndex.neighboring[stopId];
}

export function isSingleTransit(stopAId: string, stopBId: string) {
    return transitIndex.singleTransits[keyOf(stopAId, stopBId)] !== undefined;
}

export function getAllBusLines() {
    return busLines;
}

export function getBusLine(busLine: string) {
    return busLines[busLine];
}

export function getAllBusStops() {
    return BUSSTOPS;
}

export function getBusStop(query: {
    busStopId?: string;
    busStopName?: string;
    coordinates?: { lat: number; lng: number };
}): BusStop {
    if (!(query.busStopId || query.busStopName || query.coordinates)) {
        throw new Error("Invalid query.");
    }
    let busStop;
    if (query.busStopId) {
        busStop = BUSSTOPS[query.busStopId];
    } else if (query.busStopName) {
        busStop = busStopValues.find(
            (stop) => stop.name_en === query.busStopName,
        );
    } else if (query.coordinates) {
        busStop = busStopValues.find(
            (stop) =>
                stop.lat === query.coordinates!.lat &&
                stop.lng === query.coordinates!.lng,
        );
    }
    if (!busStop) {
        throw new Error(`Bus stop query ${JSON.stringify(query)} is invalid.`);
    }
    return busStop;
}
