<script lang="ts">
    import type { BusLine } from "$lib/db";

    export let busLine: BusLine;
</script>

<a class="flex justify-start mb-7" href="/buslines/{busLine.busLineId}">
    <div
        class="bg-bus-blue w-14 h-14 me-5 flex rounded-lg items-center justify-center"
    >
        <span class="text-2xl text-white Arial">
            {busLine.busLineId}
        </span>
    </div>
    <div class="flex flex-col justify-center">
        <div
            class="my-lang text-white text-xs flex justify-start items-center w-full mb-2"
            style="font-family: 'Noto Sans Myanmar', serif;"
        >
            <span>
                {busLine.firstStopId}
            </span>
            <img
                src="/bi-directional-arrow.svg"
                alt="bi-directional-arrow"
                class="w-4 mx-3"
            />
            <span>
                {busLine.lastStopId}
            </span>
        </div>
        <div
            class="my-lang text-white text-xs text-dim"
        >
            {busLine.stops.length} total stops
        </div>
    </div>
</a>
