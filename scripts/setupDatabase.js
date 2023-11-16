import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";

const prisma = new PrismaClient();

async function main() {
  // We create a new user
  const buses = JSON.parse((readFileSync("./scripts/bus_data.json", "utf-8")));
  for (const bus of buses) {
    if (!bus.manually_checked) {
      continue;
    }

    for (let i = 0; i < bus.stops.length; i++) {
      const stop = bus.stops[i];
      if (await prisma.busStop.findFirst({ where: { stopName: stop } })) {
        continue;
      }
      await prisma.busStop.create({
        data: {
          stopName: stop,
          latitude: Math.floor(Math.random() * 17) + 16,
          longitude: Math.floor(Math.random() * 98) + 95,
          address: stop,
        },
      });
    }

    // find start and end points as stops
    const startPoint = await prisma.busStop.findFirst({
      where: {
        stopName: bus.stops[0],
      },
    });

    const endPoint = await prisma.busStop.findFirst({
      where: {
        stopName: bus.stops[bus.stops.length - 1],
      },
    });

    const busLine = await prisma.busLine.create({
      data: {
        id: bus.id,
        busLineId: bus.line_number,
        endPointId: endPoint.id,
        startPointId: startPoint.id,
      },
    });

    // add routed stops
    for (let i = 0; i < bus.stops.length; i++) {
      const stop = bus.stops[i];

      const stopRow = await prisma.busStop.findFirst({ where: { stopName: stop } });
      await prisma.routedBusStop.create({
        data: {
          stopId: stopRow.id,
          busLineId: busLine.busLineId,
          stopOrder: i,
        },
      });
    }
  };
  console.log("Bus data seeded.");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
