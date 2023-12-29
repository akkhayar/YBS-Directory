<script lang="ts">
    import type { PageData } from "./$types";
    import { route } from "$lib/stores/route";
    import BottomSlide from "$lib/components/BottomSlide.svelte";

    export let data: PageData;
    const routeArray = data.routedBusStops.map((busStops) => [
        busStops.latitude,
        busStops.longitude,
    ]);

    route.set(routeArray);
</script>

<BottomSlide>
    <div>
        <h1>Bus Line: {data.busLine.busLineId}</h1>
        <div class="grid place-items-center grid-cols-2 gap-1 hidden">
            <div class="grid place-items-center grid-cols-2 gap-1">
                <div class="font-bold">Order</div>
                <div class="font-bold">Bus Stop</div>

                {#each data.routedBusStops as routedStop}
                    <div>{routedStop.name}</div>
                {/each}
            </div>
        </div>
    </div>
</BottomSlide>
