<script lang="ts">
    import type { BusLine } from "$lib/db";

    export let busLine: BusLine;
</script>

<a class="flex my-10" href="/buslines/{busLine.busLineId}">
    <div
        class="bg-blue-600 w-10 h-10 me-5 flex justify-center items-center"
    >
        <p class="m-auto text-2xl text-white">
            {busLine.busLineId}
        </p>
    </div>
    <div
        class="my-lang col-span-2 text-white text-xs"
        style="font-family: 'Noto Sans Myanmar', serif;"
    >
        {busLine.firstStopId} ⇔ {busLine.lastStopId}
    </div>
</a>
