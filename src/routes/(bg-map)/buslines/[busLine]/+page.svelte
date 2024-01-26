<script lang="ts">
    import type { PageData } from "./$types";
    import { geoJSON } from "$lib/stores/route";
    import { onDestroy, onMount } from "svelte";
    import { fade } from "svelte/transition";
    import { title, translate } from "$lib/utils";
    import LazyListView from "$lib/components/ui/LazyListView.svelte";
    import BottomDrawer from "$lib/components/ui/bottom-drawer/BottomDrawer.svelte";
    import BackButton from "$lib/components/ui/BackButton.svelte";

    export let data: PageData;

    onMount(() => {
        // display the route on the map by setting the glob store
        geoJSON.set(data.busLine);
    });

    onDestroy(() => {
        geoJSON.set(undefined);
    });

    // For tailwind
    "bg-busBlue-100";
    "bg-busRed-100" ;
    "bg-busPurple-100";
    "bg-busCyan-100";
    "bg-busBrown-100";
    "bg-busGray-100";
</script>

{#if data.busLine}
    <BackButton />
    <BottomDrawer let:Scrollable let:Header height="low">
        <Header>
            <div
                class="flex justify-center bg-bus{title(
                    data.busLine.metadata.color,
                )}-100 rounded-lg"
            >
                <div
                    class="me-5 flex h-16 w-14 items-center justify-center px-2"
                >
                    <span
                        class="{data.busLine.metadata.route_id.length <= 3
                            ? 'text-2xl'
                            : 'text-[10px]'} Arial text-white"
                    >
                        {data.busLine.metadata.route_id}
                    </span>
                </div>
                <div class="flex flex-col justify-center">
                    <div
                        class="my-lang mb-2 flex w-full items-center justify-start text-xs text-white"
                    >
                        <span>
                            {data.routedBusStops[0].name_mm} - 
                            {data.routedBusStops[data.routedBusStops.length - 1]
                                .name_mm}
                        </span>
                    </div>
                    <div class="my-lang text-dim text-xs text-white">
                        {translate(data.routedBusStops.length.toString())} မှတ်တိုင်များ
                    </div>
                </div>
                <div
                    class="ms-5 flex h-14 w-14 items-center justify-center px-2"
                >
                    <span
                        class="{data.busLine.metadata.route_id.length <= 3
                            ? 'text-2xl'
                            : 'text-[10px]'} my-lang text-white"
                    >
                        {translate(data.busLine.metadata.route_id)}
                    </span>
                </div>
            </div>
        </Header>
        <Scrollable>
            <div class="timeline mt-2 text-white">
                <LazyListView
                    items={data.routedBusStops}
                    initialBuffer={6}
                    let:data={routedStop}
                >
                    <div in:fade={{ duration: 200, delay: 200 }} class="event">
                        <div class="event-icon"></div>
                        <div class="event-content my-lang">
                            {routedStop.name_mm}
                        </div>
                    </div>
                </LazyListView>
            </div>
        </Scrollable>
    </BottomDrawer>
{:else}
    <!-- TODO -->
    <h1>Busline not found.</h1>
{/if}

<style>
    .timeline {
        position: relative;
        padding-left: 30px; /* Space for the line and event-icon */
    }

    .event {
        position: relative;
        margin-bottom: 20px; /* Space between events */
    }

    .event-icon {
        position: absolute;
        left: 0; /* Align the icon's center with the line */
        width: 8px; /* Icon size */
        height: 8px; /* Icon size */
        transform: translate(-239%); /* Center align the icon properly */
        border: 2px solid black;
        border-radius: 50%;
        background-color: white;
        z-index: 1; /* Ensure the icon is above the line */
    }

    .event-content {
        padding-left: 10px; /* Space between the icon and text */
        transform: translateY(-10px);
    }

    /* After the event elements, the line is created as a pseudo-element */
    .timeline::before {
        content: "";
        position: absolute;
        left: 14px; /* Half of the icon width plus its border to align with the icon center */
        top: 1px;
        bottom: 0;
        width: 2px; /* Line thickness */
        background-color: black; /* Line color */
        z-index: 0; /* Ensure the line is behind the icons */
        margin-bottom: 37px;
    }
</style>
