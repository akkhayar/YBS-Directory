<script lang="ts">
    interface Location {
        lng: number;
        lat: number;
        stopId: string | null;
    }

    interface TransitSegment {
        order: number;
        type: string | "walk" | "transit";
        distance: number;
        from: number[] | { busLineId: string; stopId: string };
        to: number[] | { busLineId: string; stopId: string };
    }

    interface Journey {
        fromLoc: Location;
        toLoc: Location;
        routeSegments: TransitSegment[];
    }
    export let routeInfo: Journey;
</script>

<div class="border-b-slate-300 border-b p-4">
    <div class="flex">
        {#each routeInfo.routeSegments as segment}
            <div
                class="rounded-xl w-80"
                style="background-color: var(--color-primary-light);"
            >
                {#if segment.type === "walk"}
                    <div>
                        <div>Walk</div>
                        <div>{segment.distance}m</div>
                    </div>
                {:else}
                    <div>
                        <div>Bus</div>
                        <img src="bus.svg" alt="bus-img" />
                        <div>{segment.from.stopId}</div>
                        <div>{segment.to.stopId}</div>
                    </div>
                {/if}
            </div>
        {/each}
    </div>
    <div class="flex justify-between">
        <div class="rounded-3xl bg-slate-300 flex justify-between">
            <div class="mx-3 w-fit">
                {routeInfo.fromLoc.stopId} - {routeInfo.toLoc.stopId}
            </div>
        </div>
        <button class="w-20"> > </button>
    </div>
</div>
