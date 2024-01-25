<script lang="ts">
    import { BUSSTOPS, BUSLINES } from "$lib/database";
    export let busStopName: string | undefined;

    const busStopData = Object.values(BUSSTOPS).find(
        (busStop) => busStop.name_mm === busStopName,
    );

    const busLineData = Object.values(BUSLINES).filter((busLine) =>
        Object.values(busLine.stops).includes(busStopData!.name_mm),
    );
</script>

<div class="z-10 h-10 w-10 bg-white">
    {#each busLineData as busLine}
        <div class="flex flex-row items-center justify-center">
            {busLine}
        </div>
    {/each}
</div>
