<script lang="ts">
    import type { PageData } from "./$types";
    import { geoJSON } from "$lib/stores/route";
    import BottomDrawer from "$lib/components/ui/bottom-drawer/BottomDrawer.svelte";
    import BackButton from "$lib/components/BackButton.svelte";
    import { onDestroy, onMount } from "svelte";

    export let data: PageData;

    onMount(() => {
        console.log(`GeoJSON set to ${data.busLine?.metadata.route_id}`);
        geoJSON.set(data.busLine);
    });

    onDestroy(() => {
        console.log(`GeoJSON destroyed.`);

        geoJSON.set(undefined);
    });
</script>

{#if data.busLine}
    <BackButton />
    <BottomDrawer let:Scrollable let:Header height='low'>
        <Header let:Title2>
            <Title2>
                Stops between: <span class="NotoSansMyanmar"
                    >{data.routedBusStops[0].name_mm} - {data.routedBusStops[
                        data.routedBusStops.length - 1
                    ].name_mm}</span
                >
            </Title2>
        </Header>
        <Scrollable>
            <div class="timeline text-white mt-2">
                {#each data.routedBusStops as routedStop}
                    <div class="event">
                        <div class="event-icon"></div>
                        <div class="event-content my-lang">{routedStop.name_mm}</div>
                    </div>
                {/each}
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
    }
</style>
