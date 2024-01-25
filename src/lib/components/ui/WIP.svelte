<script>
    import { fade, slide } from "svelte/transition";
</script>

<div
    in:slide={{ duration: 200, delay: 1000, axis: "x" }}
    out:fade={{ duration: 0 }}
    class="absolute left-0 top-[90%] w-full z-20"
>
    <div
        class="mx-2 flex rounded-lg border border-black border-opacity-30 bg-white px-4 py-1"
    >
        <div class="pe-3 text-lg">⚠️</div>
        <div class="text-sm">
            <span class="font-bold">
                Heads up!<br />
            </span>
            This page is currently a work in progress.
        </div>
    </div>
</div>
