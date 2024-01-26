import { getAllBusLines } from "$lib/server/database";

export const load = () => {
    return {
        busLines: Object.values(getAllBusLines()).map((busLineGeoJSON) => ({
            metadata: busLineGeoJSON.metadata,
            properties: busLineGeoJSON.properties,
        })),
    };
};
