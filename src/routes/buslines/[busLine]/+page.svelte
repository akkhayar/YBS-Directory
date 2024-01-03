<script lang="ts">
    import type { PageData } from "./$types";
    import { route } from "$lib/stores/route";
    import BottomSlide from "$lib/components/BottomSlide.svelte";
    import BottomSlideScrollable from "$lib/components/BottomSlideScrollable.svelte";
    import BottomSlideTitle from "$lib/components/BottomSlideTitle.svelte";

    export let data: PageData;
    const routeArray = data.routedBusStops.map((busStops) => [
        busStops.latitude,
        busStops.longitude,
    ]);

    route.set(routeArray);
</script>

<div class="absolute top-80 flex h-fit">
    <BottomSlide>
        <BottomSlideTitle>
            Stops between: <span class="NotoSansMyanmar"
                >{data.routedBusStops[0].name} - {data.routedBusStops[
                    data.routedBusStops.length - 1
                ].name}</span
            >
        </BottomSlideTitle>
        <h1>Bus Line: {data.busLine.busLineId}</h1>
        <BottomSlideScrollable>
            <div class="flex">
                <div class="grid grid-cols-2 place-items-center gap-1">
                    <div class="grid grid-cols-3 place-items-center gap-1">
                        <div class="font-bold">Buses</div>
                        <div />
                        <div class="font-bold">Bus Stop</div>
                        {#each data.routedBusStops as routedStop}
                            <div>BUSES</div>
                            <div>-</div>
                            <div>{routedStop.name}</div>
                        {/each}
                    </div>
                </div>
            </div>
        </BottomSlideScrollable>
    </BottomSlide>
</div>
