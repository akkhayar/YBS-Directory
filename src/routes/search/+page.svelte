<script lang="ts">
    import type { PageData } from "./$types";
    import type { TransitPath } from "$lib/database.d";
    import { createSearchStore, searchHandler } from "$lib/stores/search";
    import { onDestroy } from "svelte";
    import { writable, type Writable } from "svelte/store";
    import RouteCard from "./RouteCard.svelte";
    import BusStopCard from "./BusStopCard.svelte";
    import BusStopSearchBar from "./BusStopSearchBar.svelte";
    import BottomDrawer from "$lib/components/ui/bottom-drawer/BottomDrawer.svelte";
    import LazyListView from "$lib/components/LazyListView.svelte";

    export let data: PageData;

    const searchStore = createSearchStore(
        data.busStops,
        (stop) => stop.name_en,
    );
    const unsubscribe = searchStore.subscribe((model) => {
        searchHandler(model, (value) => value.name_en.toLowerCase());
    });

    // Writables for the two search boxes
    let originBusStop: Writable<string> = writable("");
    let destBusStop: Writable<string> = writable("");

    // Set bus stop a as last written by default
    let lastWrittenStop = originBusStop;

    function updateSearchStore(busStopName: string) {
        searchStore.update((model) => {
            return {
                ...model,
                search: busStopName,
            };
        });
    }

    originBusStop.subscribe(updateSearchStore);
    destBusStop.subscribe(updateSearchStore);

    // Sets the clicked bus stop card to the selected search bar
    function busStopSetter(busStop: string) {
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

    async function search() {
        // Hit the backend transit path router
        // const response = await fetch(
        //     `/api/route?from=${$originBusStop?.id}&to=${$destBusStop?.id}`,
        // );
        // searchedRoute = (await response.json()) as TransitPath;
        // searchedRoute.segments.forEach((element) => {
        //     console.log(
        //         `${element.startStop.name_mm} - ${element.busLine?.metadata.route_id} > ${element.endStop.name_mm}`,
        //     );
        // });
        // isSearched.set(!$isSearched);
    }
    // onMount(async () => {
    //     await search();
    // });

    let isSearched = writable(false);
    let searchedRoute: TransitPath;

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
                    src="/assets/images/location.svg"
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
                <img src="/assets/images/swap.svg" alt="swap" class="w-7" />
            </button>
        </BusStopSearchBar>
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
                <LazyListView items={$searchStore.filtered} let:data={busStop}>
                    <BusStopCard
                        {busStop}
                        onClick={busStopSetter(busStop.name_en)}
                    />
                </LazyListView>
            {/if}
        </Scrollable>
    </BottomDrawer>
</div>
