<script lang="ts">
    import type { BusStop } from "$lib/database.d";

    export let busStop: BusStop;
    export let onClick: () => void;
</script>

<button on:click={onClick} class="my-2 Poppins text-left text-white bg-gray-700 bg-opacity-30 w-full rounded-2xl p-4">
    <div class="flex">
        <img src="/assets/images/location.svg" alt="location" class="w-3" />
        <div class="my-lang ps-2">{busStop.name_en}</div>
    </div>
    <div class="my-lang text-xs font-light">{busStop.road_en}</div>
</button>
<br />
