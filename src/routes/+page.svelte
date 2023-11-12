<script lang="ts">
    import { createSearchStore, searchHandler } from "$lib/stores/search";
    import { onDestroy } from "svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
    const searchStore = createSearchStore(data.busStops);

    const unsubscribe = searchStore.subscribe((model) => {
        searchHandler(model);
    });

    onDestroy(() => {
        unsubscribe();
    });
</script>

<h1>Welcome to YBS Directory</h1>
<table>
    <tr>
        <td><a href="/buslines">Bus Lines</a></td>
    </tr>
</table>
<div class="search container">
    <h1>Search Bus Stop</h1>
    <input
        type="search"
        placeholder="Search A..."
        bind:value={$searchStore.search}
    />
</div>

<div class="grid grid-cols-3 gap-2">
    <div><strong>Name</strong></div>
    <div><strong>Address</strong></div>
    <div><strong>URL</strong></div>
    {#each $searchStore.filtered as busStop}
        <div>{busStop.stopName}</div>
        <div>{busStop.address}</div>
        <div><a href="/stops/{busStop.id}">See More</a></div>
    {/each}
</div>

<style>
    .search {
        margin-bottom: 1rem;
    }

    .search input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 0.25rem;
    }
</style>
