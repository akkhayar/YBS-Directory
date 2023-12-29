import { BUSSTOPS } from '$lib/db';

export const load = () => {
    return {
        busStops: Object.values(BUSSTOPS.index).map((id) => (BUSSTOPS.busStops[id]))
    };
};