<script lang="ts">
    import type { PageData } from "./$types";
    import type { BusStop } from "$lib/db";
    import { createSearchStore, searchHandler } from "$lib/stores/search";
    import { onDestroy } from "svelte";
    import { writable } from "svelte/store";
    import RouteCard from "./RouteCard.svelte";
    import BusStopCard from "./BusStopCard.svelte";
    import BusStopSearchBar from "./BusStopSearchBar.svelte";
    import BottomSlide from "$lib/components/BottomSlide.svelte";
    import BottomSlideTitle from "$lib/components/BottomSlideTitle.svelte";
    import BottomSlideScrollable from "$lib/components/BottomSlideScrollable.svelte";

    export let data: PageData;

    const searchStore = createSearchStore(data.busStops);

    const unsubscribe = searchStore.subscribe((model) => {
        searchHandler(model);
    });

    // writables for the two search boxes
    let busStopA = writable("");
    let busStopB = writable("");

    // set bus stop a as last written by default
    let lastWrittenStop = busStopA;

    const updater = (value: string) => {
        searchStore.update((model) => {
            return {
                ...model,
                search: value,
            };
        });
    };

    busStopA.subscribe(updater);
    busStopB.subscribe(updater);

    busStopB.subscribe((value) => {
        // update searchstore.search
        searchStore.update((model) => {
            return {
                ...model,
                search: value,
            };
        });
    });

    function getBusStopSetter(busStop: BusStop) {
        const setter = () => {
            lastWrittenStop.set(busStop.name);
            searchStore.update((model) => {
                return {
                    ...model,
                    search: "",
                };
            });
            // switch last written stop to the other one
            // so that the user is able to set bus stops quickly
            lastWrittenStop =
                lastWrittenStop === busStopA ? busStopB : busStopA;
        };
        return setter;
    }

    function switchBusStops() {
        const busStopAValue = $busStopA;
        busStopA.set($busStopB);
        busStopB.set(busStopAValue);
    }

    onDestroy(() => {
        unsubscribe();
    });

    let isSearched = writable(false);

    function searchBus() {
        isSearched.set(!$isSearched);
    }

    const routeInfo = {
        fromLoc: {
            lng: 0.22,
            lat: 0.22,
            stopId: "1",
        },
        toLoc: {
            lng: 0.22,
            lat: 0.22,
            stopId: null,
        },
        routeSegments: [
            {
                order: 1,
                type: "walk",
                distance: 1000,
                duration: 10,
                from: [21, 21],
                to: [31, 21],
            },
            {
                order: 1,
                type: "transit",
                distance: 1000,
                duration: 200,
                from: {
                    busLineId: "3",
                    stopId: "2",
                },
                to: {
                    busLineId: "4",
                    stopId: "23",
                },
            },
            {
                order: 2,
                type: "transit",
                distance: 1000,
                duration: 30,
                from: {
                    busLineId: "131",
                    stopId: "23",
                },
                to: {
                    busLineId: "131",
                    stopId: "51",
                },
            },
        ],
    };
</script>

<div class="flex h-screen flex-col justify-between">
    <div class="search-bar grid grid-cols-1 px-6 py-5">
        <BusStopSearchBar
            onInputClick={() => (lastWrittenStop = busStopA)}
            placeholder="Source"
            valueStore={busStopA}
        >
            <button
                on:click={searchBus}
                disabled={($busStopA && $busStopB) === ""}
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
            onInputClick={() => (lastWrittenStop = busStopB)}
            placeholder="Destination"
            valueStore={busStopB}
        >
            <button
                on:click={switchBusStops}
                disabled={($busStopA && $busStopB) === ""}
            >
                <img src="/swap.svg" alt="swap" class="w-7" />
            </button>
        </BusStopSearchBar>
    </div>

    <BottomSlide size={2}>
        <BottomSlideTitle>
            {#if $isSearched}
                Routes Found
            {:else}
                Locations Found
            {/if}
        </BottomSlideTitle>
        <BottomSlideScrollable>
            {#if $isSearched}
                <RouteCard {routeInfo} />
            {:else}
                {#each $searchStore.filtered as busStop}
                    <BusStopCard
                        {busStop}
                        onClick={getBusStopSetter(busStop)}
                    />
                {/each}
            {/if}
        </BottomSlideScrollable>
    </BottomSlide>
</div>

<style>
    .shadow {
        box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
    }
</style>
