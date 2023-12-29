import { BUSLINES, BUSSTOPS } from "$lib/db";
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
    const busLine = BUSLINES[params.busLine];
    if (busLine === undefined) {
        error(404, {
			message: `Not found '${params.busLine}'`
		});
    }

    return {
        busLine,
        routedBusStops: busLine.stops.map((stopName) => BUSSTOPS.busStops[BUSSTOPS.index[stopName]])
    };
};