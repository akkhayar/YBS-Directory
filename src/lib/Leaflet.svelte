<script lang="ts">
    import {
        onMount,
        onDestroy,
        setContext,
        createEventDispatcher,
        tick,
    } from "svelte";
    import L from "leaflet";
    import "leaflet-routing-machine";
    import "leaflet/dist/leaflet.css";

    export let bounds: L.LatLngBoundsExpression | undefined = undefined;
    export let view: L.LatLngExpression | undefined = undefined;
    export let zoom: number | undefined = undefined;
    export let latLngRouteArray: L.LatLng[] | undefined = undefined;

    // require("leaflet-routing-machine");

    const dispatch = createEventDispatcher();

    let map: L.Map | undefined;
    let mapElement: HTMLElement;

    onMount(() => {
        if (!bounds && (!view || !zoom)) {
            throw new Error("Must set either bounds, or view and zoom.");
        }

        map = L.map(mapElement, { maxBounds: bounds })
            // example to expose map events to parent components:
            .on("zoom", (e) => dispatch("zoom", e))
            .on("popupopen", async (e) => {
                await tick();
                e.popup.update();
            });

        L.tileLayer(
            "https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
            {
                attribution:
                    '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 18,
            }
        ).addTo(map);

        L.Routing.control({
            waypoints: latLngRouteArray,
            show: false,
            router: L.Routing.osrmv1({
                serviceUrl: "http://router.project-osrm.org/route/v1/",
            }),
        }).addTo(map);
    });

    onDestroy(() => {
        map?.remove();
        map = undefined;
    });

    setContext("map", {
        getMap: () => map,
    });

    $: if (map) {
        if (bounds) {
            map.fitBounds(bounds);
            map.setMinZoom(map.getBoundsZoom(map.options.maxBounds!));
        } else if (view && zoom) {
            map.setView(view, zoom);
        }
    }
</script>

<div class="w-full h-full" bind:this={mapElement}>
    {#if map}
        <slot />
    {/if}
</div>
