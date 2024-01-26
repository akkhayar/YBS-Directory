<script lang="ts">
    import type { PageData } from "./$types";
    import { createSearchStore } from "$lib/stores/search";
    import { fade, slide } from "svelte/transition";
    import BottomDrawer from "$lib/components/ui/bottom-drawer/BottomDrawer.svelte";
    import LazyListView from "$lib/components/ui/LazyListView.svelte";
    import HideSearchBar from "$lib/components/ui/HideSearchBar.svelte";
    import BackButton from "$lib/components/ui/BackButton.svelte";
    import BusCard from "./BusCard.svelte";
    import type { GeoJsonProperties } from "geojson";

    export let data: PageData;

    type ShallowBusLine = {
        metadata: {
            agency_id: string;
            color: "red" | "blue" | "cyan" | "brown" | "purple";
            route_id: string;
            stops: string[];
        };
        properties: GeoJsonProperties;
    };

    let searchStore = createSearchStore<ShallowBusLine>(
        data.busLines,
        (busLine) => busLine.metadata.route_id,
        "metadata.route_id",
    );

    const search = $searchStore.search;
</script>

<BackButton />
<HideSearchBar />
<BottomDrawer let:Scrollable let:Header>
    <Header>
        <div
            in:slide={{ duration: 200, axis: "y", delay: 250 }}
            class="flex justify-start border-b-2 border-solid border-white bg-transparent px-3 pb-2"
        >
            <img
                in:fade={{ duration: 200, delay: 200 }}
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
            {@const name = bus.properties.name.split("-")}
            <BusCard
                busLineId={bus.metadata.route_id}
                busLineFirstStopName={name[0]}
                busLineLastStopName={name[1]}
                totalStops={bus.metadata.stops.length}
                cardColor={bus.metadata.color}
            />
        </LazyListView>
    </Scrollable>
</BottomDrawer>
