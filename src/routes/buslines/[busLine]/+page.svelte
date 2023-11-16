<script lang="ts">
    import { onMount } from "svelte";
    import type { PageData } from "./$types";
    export let data: PageData;

    let Leaflet: any;
    let routeArray: any;

    onMount(async () => {
        // dynamically import the CSR component and lib
        const L = (await import("leaflet")).default;
        Leaflet = (await import("$lib/Leaflet.svelte")).default;

        routeArray = [
            L.latLng(
                data.routedBusStops[0].stop.latitude,
                data.routedBusStops[0].stop.longitude
            ),
            L.latLng(
                data.routedBusStops[data.routedBusStops.length - 1].stop
                    .latitude,
                data.routedBusStops[data.routedBusStops.length - 1].stop
                    .longitude
            ),
        ];
    });
</script>

<div class={data.busLine.busLineId}>
    <h1>Bus Line: {data.busLine.busLineId}</h1>
    <div class="grid place-items-center grid-cols-2 gap-1">
        <div class="grid place-items-center grid-cols-2 gap-1">
            <div class="font-bold">Order</div>
            <div class="font-bold">Bus Stop</div>

            {#each data.routedBusStops as routedStop}
                <div>{routedStop.stopOrder}</div>
                <div>{routedStop.stop.stopName}</div>
            {/each}
        </div>
        {#if Leaflet}
            <svelte:component this={Leaflet} latLngRouteArray={routeArray} />
        {/if}
    </div>
</div>
