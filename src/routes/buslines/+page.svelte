<script lang="ts">
    import BottomSlide from "$lib/components/BottomSlide.svelte";
    import BackButton from "$lib/components/BackButton.svelte";
    import BusCard from "./BusCard.svelte";
    import type { PageData } from "./$types";
    import type { BusLineGeoJSON } from "$lib/database.d";

    export let data: PageData;

    function getBusStopNameIndex(bus: BusLineGeoJSON, index: number) {
        if (bus.metadata.stops.length === 0) return "";
        return data.busStops[bus.metadata.stops[index === -1 ? bus.metadata.stops.length-1 : index ]].name_mm;
    }
</script>

<BackButton />
<BottomSlide let:Scrollable>
    <input
        class="mb-3 mt-5 flex h-10 flex-grow justify-between rounded-full border border-solid border-primary-100 bg-white px-5 shadow sm:w-80 sm:flex-none"
        type="search"
    />
    <Scrollable>
        {#each data.busLines as bus}
            <BusCard
                busLineId={bus.metadata.route_id}
                busLineFirstStopName={getBusStopNameIndex(bus, 0)}
                busLineLastStopName={getBusStopNameIndex(bus, -1)}
                nBusLineStops={bus.metadata.stops.length}
                cardColor={bus.metadata.color}
            />
        {/each}
    </Scrollable>
</BottomSlide>
