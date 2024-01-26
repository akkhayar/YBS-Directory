<script lang="ts">
    import type { PageData } from "./$types";
    import type { TransitPath } from "$lib/database.d";
    import { createSearchStore } from "$lib/stores/search";
    import { writable, type Writable } from "svelte/store";
    import { send, receive } from "$lib/pageCrossFade";
    import { fade } from "svelte/transition";
    import RouteCard from "./RouteCard.svelte";
    import BusStopCard from "./BusStopCard.svelte";
    import BusStopSearchBar from "./BusStopSearchBar.svelte";
    import BottomDrawer from "$lib/components/ui/bottom-drawer/BottomDrawer.svelte";
    import LazyListView from "$lib/components/ui/LazyListView.svelte";

    export let data: PageData;

    const searchStore = createSearchStore(
        data.busStops,
        (stop) => stop.name_mm,
        "name_mm",
    );

    // writables for the two search boxes
    let originBusStop: Writable<string> = writable("");
    let destBusStop: Writable<string> = writable("");

    // Set bus stop a as last written by default
    let lastInteractedStop = originBusStop;

    function updateSearchStore(busStopName: string) {
        $searchStore.search.set(busStopName);
    }

    originBusStop.subscribe(updateSearchStore);
    destBusStop.subscribe(updateSearchStore);

    // Sets the clicked bus stop card to the selected search bar
    function busStopSetter(busStop: string) {
        const setter = () => {
            lastInteractedStop.set(busStop);
            $searchStore.search.set("");
            // Swap last written stop for continuous setting
            lastInteractedStop =
                lastInteractedStop === originBusStop ? destBusStop : originBusStop;
        };
        return setter;
    }

    // Swap origin and destination bus stops
    function swapBusStops() {
        const busStopAValue = $originBusStop;
        originBusStop.set($destBusStop);
        destBusStop.set(busStopAValue);
    }

    function search() {
        return;
    }

    let isSearched = writable(false);
    let searchedRoute: TransitPath;
</script>

<div class="flex h-screen flex-col justify-between">
    <div class="search-bar Poppins grid grid-cols-1 px-6 py-5">
        <div
            in:send={{ key: "search" }}
            out:receive={{ key: "search" }}
            class="mb-3"
        >
            <BusStopSearchBar
                onInputClick={() => (lastInteractedStop = originBusStop)}
                placeholder="Search origin"
                valueStore={originBusStop}
            >
                <button
                    on:click={search}
                    disabled={($originBusStop && $destBusStop) === undefined}
                >
                    <img
                        src="/assets/images/location.svg"
                        alt="location"
                        class="me-1.5 w-4"
                        style="filter: invert(86%) sepia(44%) saturate(3801%) hue-rotate(359deg) brightness(102%) contrast(104%);"
                    />
                </button>
            </BusStopSearchBar>
        </div>
        <div
            in:fade={{ duration: 150, delay: 250 }}
            out:fade={{ duration: 150 }}
        >
            <BusStopSearchBar
                onInputClick={() => (lastInteractedStop = destBusStop)}
                placeholder="Search destination"
                valueStore={destBusStop}
            >
                <button
                    on:click={swapBusStops}
                    disabled={($originBusStop && $destBusStop) === undefined}
                >
                    <img src="/assets/images/swap.svg" alt="swap" class="w-7" />
                </button>
            </BusStopSearchBar>
        </div>
    </div>

    <BottomDrawer let:Scrollable let:Header>
        <Header let:Title>
            <Title>
                {#if $isSearched}
                    Routes Found
                {:else}
                    Locations Found
                {/if}
            </Title>
        </Header>
        <Scrollable>
            {#if $isSearched}
                <RouteCard journey={searchedRoute} />
            {:else}
                <LazyListView
                    items={$searchStore.filtered}
                    initialBuffer={7}
                    let:data={busStop}
                >
                    <BusStopCard
                        {busStop}
                        onClick={busStopSetter(busStop.name_mm)}
                    />
                </LazyListView>
            {/if}
        </Scrollable>
    </BottomDrawer>
</div>
