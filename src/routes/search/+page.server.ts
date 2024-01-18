import { getAllBusStops } from "$lib/server/database";
// import { generateBusStopNetwork } from "$lib/server/preprocessor";

export const load = () => {
    // await generateBusStopNetwork(Object.values(getAllBusLines()));
    return { busStops: Object.values(getAllBusStops()) };
};
