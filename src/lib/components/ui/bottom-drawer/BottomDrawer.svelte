<script lang="ts">
    import Scrollable from "$lib/components/ui/bottom-drawer/BottomDrawerScrollable.svelte";
    import Header from "$lib/components/ui/bottom-drawer/BottomDrawerHeader.svelte";
    import { slide } from "svelte/transition";

    export let height: 'medium' | 'low' = 'medium';
</script>

<div
    in:slide={{ duration: 350, axis: "y"}}
    out:slide={{ duration: 250, axis: "y"}}
    aria-label="Bottom Slide"
    class="bg-glass fixed bottom-0 left-0 right-0 flex {height === 'medium'? 'h-2/3' : 'h-2/5'} flex-col rounded-t-3xl px-5 z-10"
    id="results"
>
    <div class="mt-3.5 w-full">
        <img
            class="mx-auto w-8"
            src="/assets/images/round-drag-handle.svg"
            alt="round-drag-handle"
        />
    </div>
    <slot {Header} {Scrollable} />
</div>
