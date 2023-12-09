<script lang="ts">
  import "../app.postcss";

  import { onMount } from "svelte";

  let Leaflet: any;

  onMount(async () => {
    // dynamically import the CSR component and lib
    Leaflet = (await import("$lib/components/Leaflet.svelte")).default;
  });
</script>

{#if Leaflet}
  <svelte:component this={Leaflet} />
{/if}

<slot />
