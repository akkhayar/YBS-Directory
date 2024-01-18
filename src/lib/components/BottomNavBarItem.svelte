<script lang="ts">
    export let icon: string;
    export let label: string;
    export let url: string;
</script>

<a href={url}>
    <button
        class="flex justify-center items-center bg-white w-16 h-10 rounded-3xl border border-solid custom-box-shadow sm:w-fit sm:h-8 sm:px-3 sm:py-2 border-primary-100"
    >
        <img class="w-5 sm:mx-0 sm:w-4" src={icon} alt="search-icon" />
        <span class="ms-1 text-xs hidden sm:block" style="line-height: 3;">
            {label}
        </span>
    </button>
    <p class="text-center text-xs mt-1 leading-normal Poppins sm:hidden">{label}</p>
</a>
