<script>
    import { send, receive } from "$lib/pageCrossFade";
</script>

<button
    in:receive={{ key: "block" }}
    out:send={{ key: "block" }} 
    type="button"
    on:click={() => history.back()}
    class="absolute top-5 left-6 bg-white border w-20 h-10 rounded-3xl custom-shadow flex items-center border-primary-100"
>
    <img class="w-8 ms-3" src="/assets/images/arrow-left.svg" alt="arrow-left" />
</button>
