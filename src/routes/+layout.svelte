<script lang="ts">
    import type { LayoutData } from "./$types";
    import "../app.postcss";
    import { onMount } from "svelte";
    import { route } from "$lib/stores/route";

    export let data: LayoutData;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let LeafletMap: any;

    async function detectSWUpdate() {
        const registration = await navigator.serviceWorker.ready;

        registration.addEventListener('updatefound', () => {
            const newSW = registration.installing;
            newSW?.addEventListener('statechange', () => {
                if (newSW.state === 'installed') {
                    // show update notification
                    if (confirm("New version available! Reload to update?")) {
                        // skip waiting for last service-worker to exhaust
                        newSW.postMessage({ type: 'SKIP_WAITING' });
                        window.location.reload();
                    }
                }
            });
        });
    }

    onMount(async () => {
        await detectSWUpdate();
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
