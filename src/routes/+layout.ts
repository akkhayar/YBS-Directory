import type { BusStop } from "$lib/db.js";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ fetch }) => {
    const response = await fetch("/data/busStops");
    const busStops = Object.values((await response.json()) as BusStop[]);
    return { busStops };
};
