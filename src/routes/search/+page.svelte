<script lang="ts">
    import { createSearchStore, searchHandler } from "$lib/stores/search";
    import { onDestroy } from "svelte";
    import type { PageData } from "./$types";
    import type { BusStop } from "@prisma/client";
    import { writable, type Writable } from "svelte/store";
    import RouteCard from "./RouteCard.svelte";
    import BottomNavBar from "$lib/components/BottomNavBar.svelte";
    import BottomSlide from "$lib/components/BottomSlide.svelte";

    export let data: PageData;

    const searchStore = createSearchStore(data.busStops);

    const unsubscribe = searchStore.subscribe((model) => {
        searchHandler(model);
    });

    // writables for the two search boxes
    let busStopA = writable("");
    let busStopB = writable("");

    // searchbox that was last written to track
    // which searchbox to set when called from the
    // search results
    let lastWrittenStop = busStopA;

    function searchUpdate(busStopWritable: Writable<string>) {
        const updater = (value: string) => {
            // update searchstore.search
            lastWrittenStop = busStopWritable;
            searchStore.update((model) => {
                return {
                    ...model,
                    search: value,
                };
            });
        };
        return updater;
    }

    busStopA.subscribe(searchUpdate(busStopA));
    busStopB.subscribe(searchUpdate(busStopB));

    busStopB.subscribe((value) => {
        // update searchstore.search
        searchStore.update((model) => {
            return {
                ...model,
                search: value,
            };
        });
    });

    function setBusStop(busStop: BusStop) {
        const setter = () => {
            lastWrittenStop.set(busStop.stopName);
            // switch last written stop to the other one
            // so that the user is able to set bus stops quickly
            // from the search results
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
                from: [21, 21],
                to: [31, 21],
            },
            {
                order: 1,
                type: "transit",
                distance: 1000,
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
                from: {
                    busLineId: "YANGON-AIRPORT-BUS",
                    stopId: "23",
                },
                to: {
                    busLineId: "YANGON-AIRPORT-BUS",
                    stopId: "51",
                },
            },
        ],
    };
</script>

<div class="flex justify-between flex-col h-screen">
    <div class="search-bar grid grid-cols-1">
        <div
            class="m-3 py-2 px-5 rounded-3xl border custom-box-shadow flex bg-white"
        >
            <input
                class="flex flex-auto w-90 outline-none my-lang"
                type="search"
                placeholder="Source"
                bind:value={$busStopA}
            />
            <button
                on:click={switchBusStops}
                disabled={($busStopA && $busStopB) === ""}>Switch</button
            >
        </div>

        <input
            class="m-3 py-2 px-5 rounded-3xl border outline-none custom-box-shadow my-lang"
            type="search"
            placeholder="Destination"
            bind:value={$busStopB}
        />
    </div>
    <button disabled={($busStopA && $busStopB) === ""}>Search</button>

    <BottomSlide>
        <RouteCard {routeInfo} />
        <BottomNavBar />
    </BottomSlide>
</div>
