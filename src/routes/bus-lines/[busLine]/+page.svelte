<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<div class="{data.busLine.lineTag}">
    <h1>Bus Line: {data.busLine.lineTag}</h1>
    <div class="grid place-items-center grid-cols-2 gap-2">
        <div class="font-bold">Order</div>
        <div class="font-bold">Bus Stop</div>

        {#each data.routedBusStops as routedStop}
            <div>{routedStop.stopOrder}</div>
            <div>{routedStop.stop.stopName}</div>
        {/each}
    </div>
</div>
