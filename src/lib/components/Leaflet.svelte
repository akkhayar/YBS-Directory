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
    import { Geolocation } from "@capacitor/geolocation";

    export let latLngRouteArray: L.LatLng[] | undefined = undefined;

    const dispatch = createEventDispatcher();

    let map: L.Map | undefined;
    let mapElement: HTMLElement;

    onMount(() => {
        const yangon = L.latLngBounds(
            L.latLng(17.090266, 95.967204),
            L.latLng(16.587593, 96.368538)
        );

        map = L.map(mapElement, { maxBounds: yangon })
            // example to expose map events to parent components:
            .on("zoom", (e) => dispatch("zoom", e))
            .on("popupopen", async (e) => {
                await tick();
                e.popup.update();
            });

        L.tileLayer("https://tile.openstreetmap.de/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18,
            minZoom: 11,
        }).addTo(map);

        if (latLngRouteArray) {
            L.Routing.control({
                waypoints: latLngRouteArray,
                show: false,
                router: L.Routing.osrmv1({
                    serviceUrl: "http://router.project-osrm.org/route/v1/",
                }),
            }).addTo(map);
        }

        // user location
        Geolocation.getCurrentPosition().then((position) => {
            L.marker([
                position.coords.latitude,
                position.coords.longitude,
            ]).addTo(map!);
        });

        map.fitBounds(yangon);
    });

    onDestroy(() => {
        map?.remove();
        map = undefined;
    });

    setContext("map", {
        getMap: () => map,
    });
</script>

<div class="w-full h-full absolute -z-10" bind:this={mapElement}>
    {#if map} 
        <slot />
    {/if}
</div>
