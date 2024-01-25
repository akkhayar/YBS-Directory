import { getBusStop } from "$lib/server/database";
import { TransitPathFinder } from "$lib/server/pathFinder";
import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url }) => {

    error(400, "not yet supported");
    return;
    // FEFATURE FLAG - DISABLED
    const from = url.searchParams.get("from");
    const to = url.searchParams.get("to");

    if (!(from && to)) {
        error(
            400,
            "to and from parameters, must be present in the order lat,lng",
        );
    }
    const finder = new TransitPathFinder(getBusStop({ busStopId: to! }));
    const path = await finder.findPath(getBusStop({ busStopId: from! }));
    return new Response(JSON.stringify(path));
};
