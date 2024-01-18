<script lang="ts">
    import Scrollable from "$lib/components/BottomSlideScrollable.svelte";
    import Title from "$lib/components/BottomSlideTitle.svelte";
    export let size: number = 1;

    let height = "h-3/6";
    if (size === 2) {
        height = "h-4/6";
    }
</script>

<div
    aria-label="Bottom Slide"
    class="bg-glass bg-glass absolute bottom-0 {height} w-screen rounded-t-3xl px-6"
    id="results"
>
    <div class="mt-3.5 w-full">
        <img
            class="mx-auto w-8"
            src="/round-drag-handle.svg"
            alt="round-drag-handle"
        />
    </div>
    <slot {Title} {Scrollable} />
</div>
