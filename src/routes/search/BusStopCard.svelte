<script lang="ts">
    import type { BusStop } from "$lib/database.d";

    export let busStop: BusStop;
    export let onClick: () => void;
</script>

<button on:click={onClick} class="my-2 text-left">
    <div class="flex">
        <img src="/location.svg" alt="location" class="w-3" />
        <div class="my-lang py-1 ps-2">{busStop.name_en}</div>
    </div>
    <div class="my-lang text-xs font-light">{busStop.road_en}</div>
</button>
<br />
