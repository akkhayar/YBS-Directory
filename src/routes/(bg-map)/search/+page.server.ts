import { getAllBusStops } from "$lib/server/database";

export const load = () => {
    return { busStops: Object.values(getAllBusStops()) };
};
