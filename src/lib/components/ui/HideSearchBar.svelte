<script lang="ts">
    import { send, receive } from "$lib/pageCrossFade";
</script>

<div
    in:send={{ key: "search" }}
    out:receive={{ key: "search" }}
    class="absolute right-6 top-6 h-7"
/>
