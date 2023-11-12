<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<div class="bus-lines">
    <h1>Bus Lines</h1>
    <div class="grid place-items-center grid-cols-5 gap-2">
        <div class="font-bold">Bus Line</div>
        <div class="font-bold">Starting Stop</div>
        <div>⇔</div>
        <div class="font-bold">Ending Stop</div>
        <div class="font-bold">Link</div>

        {#each data.busLines as bus}
            <div>{bus.busLineId}</div>
            <div>{data.busStops[bus.startPointId].stopName}</div>
            <div>⇔</div>
            <div>{data.busStops[bus.endPointId].stopName}</div>
            <div><a href="/buslines/{bus.busLineId}">See More</a></div>
        {/each}
    </div>
</div>
