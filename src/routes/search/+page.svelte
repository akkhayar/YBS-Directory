<script lang="ts">
    import { createSearchStore, searchHandler } from "$lib/stores/search";
    import { onDestroy } from "svelte";
    import type { PageData } from "./$types";
    import type { BusStop } from "@prisma/client";
    import { writable, type Writable } from "svelte/store";
    import Leaflet from "$lib/Leaflet.svelte";

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
            console.log(lastWrittenStop);
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
</script>

<div class="search container">
    <h1>Search Route</h1>
    <input type="search" placeholder="Source" bind:value={$busStopA} />
    <input type="search" placeholder="Destination" bind:value={$busStopB} />
    <button disabled={($busStopA && $busStopB) === ''}>Search</button>
    <button on:click={switchBusStops} disabled={($busStopA && $busStopB) === ''}>Switch</button>

    <div class="mt-5 grid grid-cols-2">
        <div><strong>Name</strong></div>
        <div><strong>Address</strong></div>
        {#each $searchStore.filtered as busStop}
            <div>{busStop.stopName}</div>
            <div><button on:click={setBusStop(busStop)}>Select</button></div>
        {/each}
    </div>
    <Leaflet />
</div>

<style>
    .search {
        margin-bottom: 1rem;
    }

    .search.container {
        width: 500px;
        margin: auto;
    }

    .search input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 0.25rem;
    }
</style>
