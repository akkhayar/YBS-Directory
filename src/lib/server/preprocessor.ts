import type { BusLineGeoJSON, Transit } from "$lib/database.d";
import { getBusStop, transitNetwork } from "$lib/server/database";
import * as fs from "fs";

export async function getTransitDistance(stopAId: string, stopBId: string) {
    const stopA = getBusStop({ busStopId: stopAId });
    const stopB = getBusStop({ busStopId: stopBId });
    console.log(`Finding distance between ${stopAId} -> ${stopBId}`);
    const request = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${stopA.lng},${stopA.lat};${stopB.lng},${stopB.lat}?overview=false`,
    );
    const response = await request.json();

    return response.routes[0].distance as number;
}

function arrayToCSV(data: object[]): string {
    if (data.length === 0) return "";

    // Extract column headers
    const headers = Object.keys(data[0]);

    // Map the array of objects to a string of CSV values
    const rows = data.map((obj) =>
        headers.map((fieldName) => obj[fieldName]).join(","),
    );

    // Combine headers and rows
    return [headers.join(","), ...rows].join("\n");
}

function stringIntSmaller(str1: string, str2: string) {
    return parseInt(str1) < parseInt(str2);
}

export function keyOf(stopAId: string, stopBId: string) {
    return stringIntSmaller(stopAId, stopBId)
        ? `${stopAId}-${stopBId}`
        : `${stopBId}-${stopAId}`;
}

export async function generateBusStopNetwork(busLines: BusLineGeoJSON[]) {
    const rows: Transit[] = Object.values(transitNetwork);
    const distanceCache: {[key: string]: number} = {};
    rows.forEach(transit => distanceCache[keyOf(transit.a, transit.b)] = transit.distance);
    // Populate rows with neighboring bus stop connections
    for (const line of Object.values(busLines)) {
        for (const [index, stopId] of line.metadata.stops.entries()) {
            // Add the previous and next stops in the line as neighbors
            console.log(`Processing ${stopId}`);
            const isExistent = (
                stopAId: string,
                stopBId: string,
                busLineId: string,
            ) =>
                rows.find(
                    (row) =>
                        row.busLineId === busLineId &&
                        (stringIntSmaller(stopAId, stopBId)
                            ? stopAId === row.a && stopBId === row.b
                            : stopAId === row.b && stopBId === row.a),
                ) !== undefined;

            if (index > 0) {
                const prevStopId = line.metadata.stops[index - 1];
                if (!isExistent(stopId, prevStopId, line.metadata.route_id)) {
                    const isStopIdSmaller = stringIntSmaller(
                        stopId,
                        prevStopId,
                    );
                    rows.push({
                        a: isStopIdSmaller ? stopId : prevStopId,
                        b: isStopIdSmaller ? prevStopId : stopId,
                        busLineId: line.metadata.route_id,
                        distance: distanceCache[keyOf(stopId, prevStopId)] || await getTransitDistance(stopId, prevStopId),
                    });
                }
            }
            if (index < line.metadata.stops.length - 1) {
                const nextStopId = line.metadata.stops[index + 1];
                if (!isExistent(stopId, nextStopId, line.metadata.route_id)) {
                    const isStopIdSmaller = stringIntSmaller(
                        stopId,
                        nextStopId,
                    );
                    rows.push({
                        a: isStopIdSmaller ? stopId : nextStopId,
                        b: isStopIdSmaller ? nextStopId : stopId,
                        busLineId: line.metadata.route_id,
                        distance: distanceCache[keyOf(stopId, nextStopId)] || await getTransitDistance(stopId, nextStopId),
                    });
                }
            }
            // console.log(`Processed ${JSON.stringify(rows[rows.length - 1])}`);
            fs.writeFileSync("./YBS-Network.csv", arrayToCSV(rows));
        }
    }
}
