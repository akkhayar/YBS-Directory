<script lang="ts">
    import type { PageData } from "./$types";
    import type { BusStop } from "$lib/db";
    import { createSearchStore, searchHandler } from "$lib/stores/search";
    import { onDestroy } from "svelte";
    import { writable } from "svelte/store";
    import RouteCard from "./RouteCard.svelte";
    import BusStopCard from "./BusStopCard.svelte";
    import BottomSlide from "$lib/components/BottomSlide.svelte";
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
        <div
            class="mb-3 flex h-10 flex-grow justify-between rounded-full border border-solid bg-white px-5 shadow sm:w-80 sm:flex-none"
            style="border-color: var(--color-primary);"
        >
            <input
                type="search"
                bind:value={$busStopA}
                on:click={() => (lastWrittenStop = busStopA)}
            />
            <button
                on:click={switchBusStops}
                disabled={($busStopA && $busStopB) === ""}>Switch</button
            >
        </div>

        <input
            class="flex h-10 flex-grow justify-between rounded-full border border-solid bg-white px-5 shadow sm:w-80 sm:flex-none"
            style="border-color: var(--color-primary);"
            type="search"
            bind:value={$busStopB}
            on:click={() => (lastWrittenStop = busStopB)}
        />
    </div>
    <button on:click={searchBus} disabled={($busStopA && $busStopB) === ""}
        >Search</button
    >

    <BottomSlide>
        <p>Locations Found</p>
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
