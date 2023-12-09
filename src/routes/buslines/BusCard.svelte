<script lang="ts">
    import type { BusLine, BusStop } from "@prisma/client";

    export let busLine: BusLine;
    export let busStops: {
        [key: string]: BusStop;
    };
</script>

<link href="https://fonts.akkhayar.com/my-lang.css" rel="stylesheet" />
<a class="grid grid-cols-3 my-10 p-4" href="/buslines/{busLine.busLineId}">
    <div
        class="bg-blue-600 w-16 h-16 flex justify-center items-center"
    >
        <p class="m-auto text-3xl text-white">
            {busLine.busLineId}
        </p>
    </div>
    <div
        class="my-lang col-span-2 text-gray-100 text-2xl"
        style="font-family: 'Noto Sans Myanmar', serif;"
    >
        {busStops[busLine.startPointId].stopName} ⇔ {busStops[
            busLine.endPointId
        ].stopName}
    </div>
</a>
