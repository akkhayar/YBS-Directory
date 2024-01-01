<script lang="ts">
    import { onMount, onDestroy, setContext } from "svelte";
    import L from "leaflet";
    import "leaflet-routing-machine";
    import "leaflet/dist/leaflet.css";
    import type { BusStop } from "$lib/db";

    export let latLngRouteArray: number[][];
    export let busStops: BusStop[];

    let map: L.Map | undefined;
    let mapElement: HTMLElement;

    const yangon = L.latLngBounds(
        L.latLng(17.090266, 95.967204),
        L.latLng(16.587593, 96.368538),
    );

    function findBounds(latLngArray: number[][]) {
        let southWest = L.latLng(latLngArray[0][0], latLngArray[0][1]);
        let northEast = L.latLng(latLngArray[0][0], latLngArray[0][1]);
        for (let i = 1; i < latLngArray.length; i++) {
            southWest = L.latLng(
                Math.min(southWest.lat, latLngArray[i][0]),
                Math.min(southWest.lng, latLngArray[i][1]),
            );
            northEast = L.latLng(
                Math.max(northEast.lat, latLngArray[i][0]),
                Math.max(northEast.lng, latLngArray[i][1]),
            );
        }
        return L.latLngBounds(southWest, northEast);
    }

    onMount(() => {
        map = L.map(mapElement, {
            maxBounds: yangon,
            center: [16.8409, 96.1735],
        });

        const tileLayer = L.tileLayer(
            "https://tile.openstreetmap.de/{z}/{x}/{y}.png",
            {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 18,
                minZoom: 11,
            },
        ).addTo(map);

        tileLayer.addEventListener("load", () => {
            L.layerGroup(
                busStops.map((busStop) => {
                    const marker = L.marker(
                        [busStop.latitude, busStop.longitude],
                        {
                            title: busStop.name,
                            icon: L.icon({
                                iconUrl: "/bus-stop.svg",
                                iconSize: [16, 16],
                            }),
                        },
                    );
                    marker.bindPopup(
                        `<button class="hover:bg-black">Go Here</button>`,
                    );
                    return marker;
                }),
            ); //.addTo(map!);
        });

        if (latLngRouteArray && latLngRouteArray.length > 0) {
            const draggable = false;
            const addWayPoints = false;

            const plan = L.Routing.plan(
                latLngRouteArray.map((latLng) =>
                    L.latLng(latLng[0], latLng[1]),
                ),
                {
                    draggableWaypoints: draggable,
                    addWaypoints: addWayPoints,
                    createMarker: (
                        _: number,
                        waypoint: L.Routing.Waypoint,
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        __: number,
                    ) =>
                        L.marker(waypoint.latLng, {
                            draggable: draggable,
                            icon: L.icon({
                                iconUrl: "/bus-stop.svg",
                                iconSize: [16, 16],
                            }),
                        }).bindPopup(
                            `<button class="hover:bg-black">Go Here</button>`,
                        ),
                },
            );

            L.Routing.control({
                plan: plan,
                router: L.Routing.osrmv1({
                    serviceUrl: "http://router.project-osrm.org/route/v1/",
                }),
                show: false,
                lineOptions: {
                    extendToWaypoints: false,
                    missingRouteTolerance: 100,
                    addWaypoints: addWayPoints,
                    styles: [
                        {
                            color: "#0d1016",
                            opacity: 1,
                            weight: 4,
                        },
                    ],
                },
            }).addTo(map);
            map.fitBounds(findBounds(latLngRouteArray));
        } else {
            map.fitBounds(yangon);
        }
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
        <!-- <BusStopPopup /> -->
    {/if}
</div>
