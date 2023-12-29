<script lang="ts">
    import { BUSSTOPS, BUSLINES } from "$lib/db";
    export let busStopName: string | undefined;

    const busStopData = Object.values(BUSSTOPS.busStops).find((busStop) => busStop.name === busStopName);

    const busLineData = Object.values(BUSLINES).filter((busLine) => busLine.stops.includes(busStopData!.name));
</script>

<div class="w-10 h-10 bg-white z-10">
    {#each busLineData as busLine}
        <div class="flex flex-row justify-center items-center">
            {busLine}
        </div>
    {/each}
</div>