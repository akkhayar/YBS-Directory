<script lang="ts">
    import type { Writable } from "svelte/store";

    export let onInputClick: () => void;
    export let placeholder: string;
    export let valueStore: Writable<string>;
</script>

<div
    class="mb-3 flex h-10 flex-grow justify-between rounded-full border border-solid bg-white px-3 py-1 shadow sm:w-80 sm:flex-none placeholder:text-muted-foreground border-primary-100"
>
    <!-- TODO: add focus-visible class to this input -->
    <input
        class="focus-visible:outline-none"
        type="search"
        placeholder="{placeholder}..."
        bind:value={$valueStore}
        on:click={onInputClick}
    />

    <slot />
</div>
