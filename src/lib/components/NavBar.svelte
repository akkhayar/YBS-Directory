<script>
    import { send, receive } from "$lib/pageCrossFade";
</script>

<div
    aria-label="Navigation Bar"
    class="absolute top-0 flex w-full px-6 py-5 pb-1 sm:w-fit"
>
    <a
        in:receive={{ key: "block" }}
        out:send={{ key: "block" }}
        aria-label="More Options"
        href="/settings"
        class="custom-shadow me-6 flex h-10 w-10 rounded-3xl border border-solid border-primary-100 bg-white"
    >
        <img
            class="mx-auto w-5"
            src="/assets/images/hamburger.svg"
            alt="search-icon"
        />
    </a>

    <a
        in:send={{ key: "search" }}
        out:receive={{ key: "search" }}
        aria-label="Search Bar"
        class="custom-shadow flex h-10 flex-grow justify-between rounded-full border border-solid border-primary-100 bg-white px-5 align-middle text-gray-400 sm:w-80 sm:flex-none"
        href="/search"
    >
        <span class="Poppins font-light" style="line-height: 2.4;"
            >Search bus stop..</span
        >
        <img
            class="filter-primary-100 ms-auto w-5"
            src="/assets/images/search-icon.svg"
            alt="search-icon"
        />
    </a>
</div>
