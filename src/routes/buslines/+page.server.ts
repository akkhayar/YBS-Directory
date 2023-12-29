import { BUSLINES } from "$lib/db";

export const load = () => {
    return {
        busLines: Object.values(BUSLINES),
    };
};
