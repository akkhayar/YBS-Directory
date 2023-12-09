<script lang="ts">
    export let icon: string;
    export let label: string;
    export let url: string;
</script>

<a href="{url}">
    <button
        class="flex-none bg-white w-20 h-12 rounded-3xl border border-solid custom-box-shadow"
        style="border-color: var(--color-primary);"
    >
        <img class="w-6 h-6 m-auto" src={icon} alt="search-icon" />
    </button>
    <p class="text-center text-sm mt-1" style="text-shadow: 1px 1px 2px white;">{label}</p>
</a>
