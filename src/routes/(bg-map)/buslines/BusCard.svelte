<script lang="ts">
    import { title } from '$lib/utils';
    
    export let busLineId: string;
    export let busLineFirstStopName: string;
    export let busLineLastStopName: string;
    export let totalStops: number;
    export let cardColor: string;
</script>

<a class="flex justify-start pb-7" href="/buslines/{busLineId}">
    <div
        class="bg-bus{title(cardColor)}-100 w-14 h-14 me-5 flex rounded-lg items-center justify-center px-2"
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
            {totalStops} total stops
        </div>
    </div>
</a>
