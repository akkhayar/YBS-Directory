<script lang="ts">
    import BottomSlide from "$lib/components/BottomSlide.svelte";
    import BottomSlideScrollable from "$lib/components/BottomSlideScrollable.svelte";
    import BackButton from "$lib/components/BackButton.svelte";
    import BusCard from "./BusCard.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<BackButton />
<BottomSlide>
    <input
        class="mb-3 mt-5 flex h-10 flex-grow justify-between rounded-full border border-solid bg-white px-5 shadow sm:w-80 sm:flex-none"
        style="border-color: var(--color-primary);"
        type="search"
    />
    <BottomSlideScrollable>
        {#each data.busLines as bus}
            <BusCard busLine={bus} />
            <BusCard busLine={bus} />
            <BusCard busLine={bus} />
            <BusCard busLine={bus} />
            <BusCard busLine={bus} />
            <BusCard busLine={bus} />
            <BusCard busLine={bus} />
            <BusCard busLine={bus} />
            <BusCard busLine={bus} />
            <BusCard busLine={bus} />
        {/each}
    </BottomSlideScrollable>
</BottomSlide>
