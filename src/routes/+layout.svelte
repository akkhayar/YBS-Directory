<script lang="ts">
    import "../app.postcss";
    import { onMount } from "svelte";

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
    />
{/if}

<slot />
