import { getBusLine, getBusStop } from "$lib/server/database";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ params }) => {
    const busLine = getBusLine(params.busLine);
    if (busLine === undefined) {
        error(404, {
            message: `Not found '${params.busLine}'`,
        });
        return;
    }
    
    return {
        busLine,
        routedBusStops: busLine.metadata.stops.map((stopID) => getBusStop({busStopId: stopID})),
    };
};
