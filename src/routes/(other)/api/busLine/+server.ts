import { getBusStop, getBusLine } from "$lib/server/database";
import { error } from "@sveltejs/kit";
import type { RequestHandler } from "../route/$types";

export const GET: RequestHandler = ({ url }) => {
    const busLineId = url.searchParams.get("busLineId");

    if (!busLineId) {
        error(
            400,
            "to and from parameters, must be present in the order lat,lng",
        );
    }

    const busLine = getBusLine(busLineId!);
    if (!busLine) {
        error(404, {
            message: `Not found '${busLineId}'`,
        });
    }

    return new Response(
        JSON.stringify({
            busLine,
            routedBusStops: busLine.metadata.stops.map((stopID) =>
                getBusStop({ busStopId: stopID }),
            ),
        }),
    );
};
