<script lang="ts">
    import { title } from "$lib/utils";
    import { translate } from "$lib/utils";

    export let busLineId: string;
    export let busLineFirstStopName: string;
    export let busLineLastStopName: string;
    export let totalStops: number;
    export let cardColor: string;

    // For tailwind
    ("bg-busBlue-100");
    ("bg-busRed-100");
    ("bg-busPurple-100");
    ("bg-busCyan-100");
    ("bg-busBrown-100");
    ("bg-busGray-100");
</script>

<a class="flex justify-start pb-7" href="/buslines/{busLineId}">
    <div
        class="bg-bus{title(
            cardColor,
        )}-100 me-5 flex h-14 w-14 items-center justify-center rounded-lg px-2"
    >
        <span
            class="{busLineId.length <= 3
                ? 'text-2xl'
                : 'text-[10px]'} Arial text-white"
        >
            {busLineId}
        </span>
    </div>
    <div class="flex flex-col justify-center">
        <div
            class="my-lang mb-2 flex w-full items-center justify-start text-xs text-white"
        >
            <span style="max-width: 92px;">
                {busLineFirstStopName}
            </span>
            <svg
                class="mx-3"
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M16.3536 4.73814C16.5488 4.54287 16.5488 4.22629 16.3536 4.03103L13.1716 0.849049C12.9763 0.653786 12.6597 0.653786 12.4645 0.849049C12.2692 1.04431 12.2692 1.36089 12.4645 1.55616L15.2929 4.38458L12.4645 7.21301C12.2692 7.40827 12.2692 7.72485 12.4645 7.92012C12.6597 8.11538 12.9763 8.11538 13.1716 7.92012L16.3536 4.73814ZM1 4.88458H16V3.88458H1V4.88458Z"
                    fill="white"
                />
                <path
                    d="M0.646447 10.3772C0.451184 10.5725 0.451184 10.8891 0.646447 11.0843L3.82843 14.2663C4.02369 14.4616 4.34027 14.4616 4.53553 14.2663C4.7308 14.071 4.7308 13.7545 4.53553 13.5592L1.70711 10.7308L4.53553 7.90235C4.7308 7.70708 4.7308 7.3905 4.53553 7.19524C4.34027 6.99998 4.02369 6.99998 3.82843 7.19524L0.646447 10.3772ZM1 11.2308H16V10.2308H1V11.2308Z"
                    fill="white"
                />
            </svg>

            <span style="max-width: 92px;">
                {busLineLastStopName}
            </span>
        </div>
        <div class="my-lang text-dim text-xs text-white">
            {translate(totalStops.toString())} မှတ်တိုင်များ
        </div>
    </div>
</a>
