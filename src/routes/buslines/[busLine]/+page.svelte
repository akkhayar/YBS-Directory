<script lang="ts">
    import type { PageData } from "./$types";
    import { route } from "$lib/stores/route";
    import BottomSlide from "$lib/components/BottomSlide.svelte";
    import BackButton from "$lib/components/BackButton.svelte";

    export let data: PageData;

    if (data.routedBusStops) {
        const routeArray = data.routedBusStops.map((busStop) => [
            busStop.lat,
            busStop.lng,
        ]);

        route.set(routeArray);
    }
</script>

{#if data.busLine}
    <BackButton />
    <BottomSlide let:Scrollable let:Title>
        <Title>
            Stops between: <span class="NotoSansMyanmar"
                >{data.routedBusStops[0].name_mm} - {data.routedBusStops[
                    data.routedBusStops.length - 1
                ].name_mm}</span
            >
            </Title>
        <Scrollable>
            <div class="flex">
                <div class="grid grid-cols-4 place-items-center gap-1">
                    <div />
                    <div class="Poppins col-span-3 font-bold text-white">
                        Stops
                    </div>
                    {#each data.routedBusStops as routedStop}
                        <div
                            class="h-2 w-2 rounded-full border border-solid border-black bg-white"
                        ></div>
                        <div class="col-span-3 text-white">
                            {routedStop.name_mm}
                        </div>
                    {/each}
                </div>
            </div>
        </Scrollable>
    </BottomSlide>
{:else}
    <!-- TODO -->
    <h1>Busline not found.</h1>
{/if}