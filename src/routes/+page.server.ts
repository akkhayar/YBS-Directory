import prisma from '$lib/prisma';

export const load = (async () => {
    const busStops = await prisma.busStop.findMany();
    return {
        busStops
    };
});