<script lang="ts">
    import BottomSlide from "$lib/components/BottomSlide.svelte";
    import BackButton from "$lib/components/BackButton.svelte";
    import BusCard from "./BusCard.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<div class="flex flex-col justify-between h-screen">
    <BackButton />
    <BottomSlide>
        {#each data.busLines as bus}
            <BusCard busLine={bus} />
        {/each}
    </BottomSlide>
</div>
