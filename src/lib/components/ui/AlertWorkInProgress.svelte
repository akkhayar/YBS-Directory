<script>
    import { fade, fly } from "svelte/transition";
</script>

<div
    in:fly={{ duration: 150, delay: 1000, x: -100}}
    out:fade={{ duration: 0 }}
    class="absolute left-0 top-[80%] w-full z-20"
>
    <div
        class="mx-3 flex rounded-lg border border-black border-opacity-30 bg-white px-4 py-1"
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
