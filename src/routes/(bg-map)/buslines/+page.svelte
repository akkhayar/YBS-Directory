<script lang="ts">
    import type { PageData } from "./$types";
    import type { BusLineGeoJSON } from "$lib/database.d";
    import { createSearchStore } from "$lib/stores/search";
    import { fade, slide } from "svelte/transition";
    import BottomDrawer from "$lib/components/ui/bottom-drawer/BottomDrawer.svelte";
    import LazyListView from "$lib/components/ui/LazyListView.svelte";
    import HideSearchBar from "$lib/components/ui/HideSearchBar.svelte";
    import BackButton from "$lib/components/ui/BackButton.svelte";
    import BusCard from "./BusCard.svelte";

    export let data: PageData;

    let searchStore = createSearchStore<BusLineGeoJSON>(
        data.busLines,
        (busLine) => busLine.metadata.route_id,
        "metadata.route_id",
    );

    const search = $searchStore.search;

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
<HideSearchBar />
<BottomDrawer let:Scrollable let:Header>
    <Header>
        <div
            in:slide={{ duration: 250, axis: "y", delay: 250 }}
            class="flex justify-start border-b-2 border-solid border-white bg-transparent px-3 pb-2"
        >
            <img
                in:fade={{ duration: 250, delay: 200 }}
                class="my-auto me-3 h-5 w-5"
                src="/assets/images/search-icon.svg"
                alt="search-icon"
                style="filter: invert(100%) sepia(0%) saturate(7500%) hue-rotate(61deg) brightness(99%) contrast(103%);"
            />
            <input
                class="Poppins w-full bg-transparent text-xs text-white placeholder:text-white focus-visible:outline-none"
                type="search"
                bind:value={$search}
                placeholder="Search Bus Lines"
            />
        </div>
    </Header>
    <Scrollable>
        <LazyListView
            items={$searchStore.filtered}
            initialBuffer={6}
            let:data={bus}
        >
            <BusCard
                busLineId={bus.metadata.route_id}
                busLineFirstStopName={getBusStopNameIndex(bus, 0)}
                busLineLastStopName={getBusStopNameIndex(bus, -1)}
                totalStops={bus.metadata.stops.length}
                cardColor={bus.metadata.color}
            />
        </LazyListView>
    </Scrollable>
</BottomDrawer>
