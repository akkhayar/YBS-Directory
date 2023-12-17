<script lang="ts">
    import { createSearchStore, searchHandler } from "$lib/stores/search";
    import { onDestroy } from "svelte";
    import type { PageData } from "./$types";
    import type { BusStop } from "@prisma/client";
    import { writable, type Writable } from "svelte/store";
    import RouteCard from "./RouteCard.svelte";
    import BottomNavBar from "$lib/components/BottomNavBar.svelte";
    import BusStopCard from "./BusStopCard.svelte";
    import BottomSlide from "$lib/components/BottomSlide.svelte";

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

    function getSearchUpdater(busStopWritable: Writable<string>) {
        const updater = (value: string) => {
            searchStore.update((model) => {
                return {
                    ...model,
                    search: value,
                };
            });
        };
        return updater;
    }

    function setActiveStore(store: Writable<string>) {
        lastWrittenStop = store;
    }

    busStopA.subscribe(getSearchUpdater(busStopA));
    busStopB.subscribe(getSearchUpdater(busStopB));

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
            console.log(lastWrittenStop);
            lastWrittenStop.set(busStop.stopName);
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

    function searchBus() {
        $busStopA;
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

<div class="flex justify-between flex-col h-screen">
    <div class="px-6 py-5 search-bar grid grid-cols-1">
        <div class="py-1 px-4 mb-4 rounded-3xl border shadow flex bg-white">
            <input
                class="flex flex-auto w-90 outline-none my-lang"
                type="search"
                placeholder="Source"
                bind:value={$busStopA}
                on:click={() => lastWrittenStop = busStopA}
            />
            <button
                on:click={switchBusStops}
                disabled={($busStopA && $busStopB) === ""}>Switch</button
            >
        </div>

        <input
            class="py-1 px-4 rounded-3xl border outline-none shadow my-lang"
            type="search"
            placeholder="Destination"
            bind:value={$busStopB}
            on:click={() => lastWrittenStop = busStopB}
            />
    </div>
    <button on:click={searchBus} disabled={($busStopA && $busStopB) === ""}
        >Search</button
    >

    <BottomSlide>
        <!-- <RouteCard {routeInfo} />
        <BottomNavBar /> -->
        {#each $searchStore.filtered as busStop}
            <BusStopCard {busStop} onClick={getBusStopSetter(busStop)} />
        {/each}
    </BottomSlide>
</div>

<style>
    .shadow {
        box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
    }
</style>
