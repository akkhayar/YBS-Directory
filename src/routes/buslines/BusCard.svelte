<script lang="ts">
    export let busLineId: string;
    export let busLineFirstStopName: string;
    export let busLineLastStopName: string;
    export let nBusLineStops: number;
    export let cardColor: string;

    const colorClassMap = {
        red: "bg-busRed-100",
        blue: "bg-busBlue-100",
        purple: "bg-busPurple-100",
        brown: "bg-busBrown-100",
        cyan: "bg-busCyan-100",
    };
</script>

<a class="flex justify-start mb-7" href="/buslines/{busLineId}">
    <div
        class="{colorClassMap[cardColor]} w-14 h-14 me-5 flex rounded-lg items-center justify-center"
    >
        <span class="text-2xl text-white Arial">
            {busLineId}
        </span>
    </div>
    <div class="flex flex-col justify-center">
        <div
            class="my-lang text-white text-xs flex justify-start items-center w-full mb-2"
            style="font-family: 'Noto Sans Myanmar', serif;"
        >
            <span>
                {busLineFirstStopName}
            </span>
            <img
                src="/bi-directional-arrow.svg"
                alt="bi-directional-arrow"
                class="w-4 mx-3"
            />
            <span>
                {busLineLastStopName}
            </span>
        </div>
        <div
            class="my-lang text-white text-xs text-dim"
        >
            {nBusLineStops} total stops
        </div>
    </div>
</a>
