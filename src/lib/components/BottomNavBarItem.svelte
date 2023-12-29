<script lang="ts">
    export let icon: string;
    export let label: string;
    export let url: string;
</script>

<a href={url}>
    <button
        class="flex-none bg-white w-16 h-10 rounded-3xl border border-solid custom-box-shadow sm:flex sm:justify-evenly sm:w-20 sm:h-8"
        style="border-color: var(--color-primary);"
    >
        <img class="w-5 m-auto sm:mx-0 sm:w-4" src={icon} alt="search-icon" />
        <p class="me-1 text-center text-xs leading-normal hidden my-auto sm:block">
            {label}
        </p>
    </button>
    <p class="text-center text-xs mt-1 leading-normal sm:hidden">{label}</p>
</a>
