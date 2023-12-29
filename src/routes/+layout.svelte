<script lang="ts">
    import type { LayoutData } from "./$types";
    import "../app.postcss";
    import { onMount } from "svelte";
    import { route } from "$lib/stores/route";

    export let data: LayoutData;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let Leaflet: any;

    onMount(async () => {
        // dynamically import the CSR component and lib
        Leaflet = (await import("$lib/components/Leaflet.svelte")).default;
    });
</script>

{#if Leaflet}
    <svelte:component
        this={Leaflet}
        busStops={data.busStops}
        latLngRouteArray={$route}
    />
{/if}

<slot />
