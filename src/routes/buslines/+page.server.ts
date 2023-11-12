import prisma from '$lib/prisma';
import type { BusStop } from '@prisma/client';

export const load = (async () => {
    const busLines = await prisma.busLine.findMany();
    const busStopsArr = await prisma.busStop.findMany({
        where: {
            id: {
                in: busLines.flatMap((busLine) => [busLine.startPointId, busLine.endPointId])
            }
        }
    });

    const busStops: { [key: string]: BusStop } = {};
    
    busStopsArr.reduce((acc, busStop) => {
        acc[busStop.id] = busStop;
        return acc;
    }, busStops);
    return {
        busLines,
        busStops
    };
});