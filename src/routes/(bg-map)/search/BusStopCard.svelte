<script lang="ts">
    import type { BusStop } from "$lib/database.d";

    export let busStop: BusStop;
    export let onClick: () => void;
</script>

<button
    on:click={onClick}
    class="Poppins my-2 w-full rounded-2xl bg-gray-700 bg-opacity-20 px-4 py-2 text-left text-white"
>
    <div class="flex">
        <img src="/assets/images/location.svg" alt="location" class="w-3" />
        <div class="ps-2 my-lang text-xs ">
            <div class="font-bold">{busStop.name_mm}</div>
            <div class="font-light">{busStop.road_mm}</div>
        </div>
    </div>
</button>
<br />
