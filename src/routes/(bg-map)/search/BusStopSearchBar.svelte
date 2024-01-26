<script lang="ts">
    import type { Writable } from "svelte/store";

    export let onInputClick: () => void;
    export let placeholder: string;
    export let valueStore: Writable<string>;
</script>

<div
    class="custom-shadow flex h-10 flex-grow justify-between rounded-full border border-solid border-primary-100 bg-white px-5 align-middle text-gray-400 sm:w-80 sm:flex-none"
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
