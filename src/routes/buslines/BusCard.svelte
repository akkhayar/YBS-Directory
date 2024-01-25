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
        gray: "bg-busGray-100"
    };
</script>

<a class="flex justify-start pb-7" href="/buslines/{busLineId}">
    <div
        class="{colorClassMap[cardColor]} w-14 h-14 me-5 flex rounded-lg items-center justify-center px-2"
    >
        <span class="{busLineId.length <= 3 ? 'text-2xl' : 'text-[10px]'} text-white Arial">
            {busLineId}
        </span>
    </div>
    <div class="flex flex-col justify-center">
        <div
            class="my-lang text-white text-xs flex justify-start items-center w-full mb-2"
        >
            <span style="max-width: 92px;">
                {busLineFirstStopName}
            </span>
            <img
                src="/assets/images/bi-directional-arrow.svg"
                alt="bi-directional-arrow"
                class="w-4 mx-3"
            />
            <span style="max-width: 92px;">
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
