<script lang="ts">
    import type { BusStop } from "$lib/db";

    export let busStop: BusStop;
    export let onClick: () => void;
</script>

<button on:click={onClick} class="text-left my-2">
    <div class="flex">
        <img src="/location.svg" alt="location" class="w-3" />
        <div class="py-1 ps-2 my-lang">{busStop.name}</div>
    </div>
    <div class="font-light text-xs my-lang">{busStop.address}</div>
</button>
<br />
