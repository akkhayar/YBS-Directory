<script lang="ts">
    import type { LayoutData } from "./$types";
    import "../app.postcss";
    import { onMount } from "svelte";
    import { route } from "$lib/stores/route";

    export let data: LayoutData;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let LeafletMap: any;

    onMount(async () => {
        // dynamically import the CSR component and lib
        LeafletMap = (await import("$lib/components/LeafletMap.svelte")).default;
    });
</script>

{#if LeafletMap}
    <svelte:component
        this={LeafletMap}
        busStops={data.busStops}
        latLngRouteArray={$route}
    />
{/if}

<slot />
