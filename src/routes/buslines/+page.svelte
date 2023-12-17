<script lang="ts">
    import type { PageData } from "./$types";
    import BottomSlide from "$lib/components/BottomSlide.svelte";
    import BackButton from "$lib/components/BackButton.svelte";
    import BusCard from "./BusCard.svelte";

    export let data: PageData;
</script>

<div class="flex flex-col justify-between h-screen">
    <BackButton />
    <BottomSlide>
        {#each data.busLines as bus}
            <BusCard busLine={bus} busStops={data.busStops} />
        {/each}
    </BottomSlide>
</div>
