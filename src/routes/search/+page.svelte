<script lang="ts">
    import type { PageData } from "./$types";
    import type { BusStop, TransitPath } from "$lib/database.d";
    import { createSearchStore, searchHandler } from "$lib/stores/search";
    import { onDestroy, onMount } from "svelte";
    import { writable, type Writable } from "svelte/store";
    import RouteCard from "./RouteCard.svelte";
    import BusStopCard from "./BusStopCard.svelte";
    import BusStopSearchBar from "./BusStopSearchBar.svelte";
    import BottomSlide from "$lib/components/BottomSlide.svelte";

    export let data: PageData;

    const searchStore = createSearchStore(data.busStops);

    const unsubscribe = searchStore.subscribe((model) => {
        searchHandler(model);
    });

    // Writables for the two search boxes
    let originBusStop: Writable<BusStop | undefined> = writable(undefined);
    let destBusStop: Writable<BusStop | undefined> = writable(undefined);

    // Set bus stop a as last written by default
    let lastWrittenStop = originBusStop;

    function updateSearchStore(busStop: BusStop | undefined) {
        searchStore.update((model) => {
            return {
                ...model,
                search: busStop?.name_en || "",
            };
        });
    }

    originBusStop.subscribe(updateSearchStore);
    destBusStop.subscribe(updateSearchStore);

    // Sets the clicked bus stop card to the selected search bar
    function busStopSetter(busStop: BusStop) {
        const setter = () => {
            lastWrittenStop.set(busStop);
            searchStore.update((model) => {
                return {
                    ...model,
                    search: "",
                };
            });
            // Swap last written stop for continuous setting
            lastWrittenStop =
                lastWrittenStop === originBusStop ? destBusStop : originBusStop;
        };
        return setter;
    }

    // Swap origin and destination bus stops
    function swapBusStops() {
        const busStopAValue = $originBusStop;
        originBusStop.set($destBusStop);
        destBusStop.set(busStopAValue);
    }

    let isSearched = writable(false);
    let searchedRoute: TransitPath;

    async function search() {
        // Hit the backend transit path router
        // const response = await fetch(
        //     `/route?from=${$originBusStop?.id}&to=${$destBusStop?.id}`,
        // );
        const response = await fetch(
            // '/route?from=85&to=319',
            '/route?from=2011&to=2342'
        );
        searchedRoute = await response.json() as TransitPath;
        searchedRoute.segments.forEach(element => {
            console.log(`${element.startStop.name_mm} - ${element.busLine?.metadata.route_id} > ${element.endStop.name_mm}`);
        });
        isSearched.set(!$isSearched);
    }
    // onMount(async () => {
    //     await search();
    // });
    onDestroy(() => {
        unsubscribe();
    });
</script>

<div class="flex h-screen flex-col justify-between">
    <div class="search-bar grid grid-cols-1 px-6 py-5">
        <BusStopSearchBar
            onInputClick={() => (lastWrittenStop = originBusStop)}
            placeholder="Search origin"
            valueStore={originBusStop}
        >
            <button
                on:click={search}
                disabled={($originBusStop && $destBusStop) === undefined}
            >
                <img
                    src="/location.svg"
                    alt="location"
                    class="me-1.5 w-4"
                    style="filter: invert(86%) sepia(44%) saturate(3801%) hue-rotate(359deg) brightness(102%) contrast(104%);"
                />
            </button>
        </BusStopSearchBar>
        <BusStopSearchBar
            onInputClick={() => (lastWrittenStop = destBusStop)}
            placeholder="Search destination"
            valueStore={destBusStop}
        >
            <button
                on:click={swapBusStops}
                disabled={($originBusStop && $destBusStop) === undefined}
            >
                <img src="/swap.svg" alt="swap" class="w-7" />
            </button>
        </BusStopSearchBar>
    </div>

    <BottomSlide let:Scrollable let:Title size={2}>
        <Title>
            {#if $isSearched}
                Routes Found
            {:else}
                Locations Found
            {/if}
        </Title>
        <Scrollable>
            {#if $isSearched}
                <RouteCard journey={searchedRoute} />
            {:else}
                {#each $searchStore.filtered as busStop}
                    <BusStopCard
                        {busStop}
                        onClick={busStopSetter(busStop)}
                    />
                {/each}
            {/if}
        </Scrollable>
    </BottomSlide>
</div>
