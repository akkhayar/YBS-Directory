import { readFileSync, writeFileSync } from "fs";

const FILES = {
    busLines: "src/lib/data/busLines.json",
    busStops: "src/lib/data/busStops.json",
};

function main() {
    // We create a new user
    const srcBusesLines = JSON.parse(
        readFileSync("./scripts/ocr/bus_data.json", "utf-8"),
    );
    const srcBusStops = JSON.parse(
        readFileSync("./scripts/osm/processed_bus_stops.json", "utf-8"),
    );
    let busLines = {};
    let busStops = { index: {}, busStops: {} };

    for (const bus of srcBusesLines) {
        if (!bus.manually_checked || !bus.full_coverage) {
            continue;
        }

        busLines[bus.line_number] = {
            id: bus.bus_id,
            busLineId: bus.line_number,
            stops: bus.stops,
            firstStopId: bus.stops[0],
            lastStopId: bus.stops[bus.stops.length - 1],
        };

        for (const busStop of bus.stops) {
            Object.assign(
                busStops["busStops"],
                srcBusStops
                    .filter((stop) => (stop.rename || stop.name) === busStop)
                    .map((stop) => {
                        if (
                            !Object.keys(busStops["index"]).includes(stop.name)
                        ) {
                            busStops["index"][stop.rename || stop.name] =
                                stop.id.toString();
                        }

                        return {
                            id: stop.id,
                            latitude: stop.latitude,
                            longitude: stop.longitude,
                            name: stop.rename || stop.name,
                            address: stop.address,
                        };
                    })
                    .reduce((map, obj) => ((map[obj.id] = obj), map), {}),
            );
        }
    }

    console.log("Bus data seeded.");
    writeFileSync(FILES.busLines, JSON.stringify(busLines));
    writeFileSync(FILES.busStops, JSON.stringify(busStops));
}

main();
