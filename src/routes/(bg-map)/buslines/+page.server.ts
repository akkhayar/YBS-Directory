import { getAllBusLines, getAllBusStops } from "$lib/server/database";

export const load = () => {
    return {
        busLines: Object.values(getAllBusLines()),
        busStops: getAllBusStops(),
    };
};
