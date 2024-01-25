<script lang="ts">
    import BottomDrawer from "$lib/components/ui/bottom-drawer/BottomDrawer.svelte";
    import BackButton from "$lib/components/BackButton.svelte";
    import BusCard from "./BusCard.svelte";
    import type { PageData } from "./$types";
    import type { BusLineGeoJSON } from "$lib/database.d";
    import LazyListView from "$lib/components/LazyListView.svelte";
    import { createSearchStore } from "$lib/stores/search";

    export let data: PageData;

    let searchStore = createSearchStore<BusLineGeoJSON>(
        data.busLines,
        (busLine) => busLine.metadata.route_id,
    );

    function getBusStopNameIndex(bus: BusLineGeoJSON, index: number) {
        if (bus.metadata.stops.length === 0) return "";
        return data.busStops[
            bus.metadata.stops[
                index === -1 ? bus.metadata.stops.length - 1 : index
            ]
        ].name_mm;
    }
</script>

<BackButton />

<BottomDrawer let:Scrollable let:Header>
    <Header>
        <div
            class="flex justify-start border-b-2 border-solid border-white bg-transparent px-3 pb-2"
        >
            <img
                class="my-auto me-3 h-5 w-5"
                src="/assets/images/search-icon.svg"
                alt="search-icon"
                style="filter: invert(100%) sepia(0%) saturate(7500%) hue-rotate(61deg) brightness(99%) contrast(103%);"
            />
            <input
                class="Poppins w-full bg-transparent text-xs text-white placeholder:text-white focus-visible:outline-none"
                type="search"
                bind:value={$searchStore.search}
                placeholder="Search Bus Lines"
            />
        </div>
    </Header>
    <Scrollable>
        <LazyListView items={data.busLines} let:data={bus}>
            <BusCard
                busLineId={bus.metadata.route_id}
                busLineFirstStopName={getBusStopNameIndex(bus, 0)}
                busLineLastStopName={getBusStopNameIndex(bus, -1)}
                nBusLineStops={bus.metadata.stops.length}
                cardColor={bus.metadata.color}
            />
        </LazyListView>
    </Scrollable>
</BottomDrawer>
