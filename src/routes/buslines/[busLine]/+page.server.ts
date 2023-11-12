import prisma from '$lib/prisma';

export const load = (async (event) => {
    const busLine = await prisma.busLine.findFirst({
        where: {
            busLineId: event.params.busLine
        },
    });

    const routedBusStops = await prisma.routedBusStop.findMany({
        where: {
            busLineId: busLine?.busLineId
        },
        include: {
            stop: true
        },
    });
    return {
        busLine: busLine!,
        routedBusStops
    };
});