import type { PageLoad } from "./$types";
import type { BusLineGeoJSON, BusStop } from "$lib/database.d";

export const load: PageLoad = async ({ fetch, params }) => {
    const request = await fetch(`/api/busLine?busLineId=${params.busLine}`);
    const response = (await request.json()) as {
        busLine: BusLineGeoJSON;
        routedBusStops: BusStop[];
    };

    return response;
};
