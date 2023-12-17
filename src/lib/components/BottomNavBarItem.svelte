<script lang="ts">
    export let icon: string;
    export let label: string;
    export let url: string;
</script>

<a href="{url}">
    <button
        class="flex-none bg-white w-16 h-10 rounded-3xl border border-solid custom-box-shadow"
        style="border-color: var(--color-primary);"
    >
        <img class="w-5 m-auto" src={icon} alt="search-icon" />
    </button>
    <p class="text-center text-xs mt-1 leading-normal">{label}</p>
</a>
