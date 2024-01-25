<script lang="ts">
    import { onMount, onDestroy, setContext } from "svelte";
    import L from "leaflet";
    import "leaflet-routing-machine";
    import "leaflet/dist/leaflet.css";
    import { geoJSON } from "$lib/stores/route";

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

    function shiftBoundsLat(bounds: L.LatLngBounds, degrees: number) {
        const northEast = bounds.getNorthEast();
        const southWest = bounds.getSouthWest();

        northEast.lat -= degrees;
        southWest.lat -= degrees;

        // Ensure the latitude stays within the valid range of -90 to 90
        return L.latLngBounds(southWest, northEast);
    }
  
    onMount(() => {
        map = L.map(mapElement, {
            maxBounds: yangon,
            center: [16.8409, 96.1735],
        });

        L.tileLayer("https://tile.openstreetmap.de/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18,
            minZoom: 11,
        }).addTo(map);

        // tileLayer.addEventListener("load", () => {
        //     L.layerGroup(
        //         busStops.map((busStop) => {
        //             const marker = L.marker([busStop.lat, busStop.lng], {
        //                 title: busStop.name_en,
        //                 icon: L.icon({
        //                     iconUrl: "/bus-stop.svg",
        //                     iconSize: [16, 16],
        //                 }),
        //             });
        //             marker.bindPopup(
        //                 `<button class="hover:bg-black">Go Here</button>`,
        //             );
        //             return marker;
        //         }),
        //     ); //.addTo(map!);
        // });

        // if (latLngRouteArray && latLngRouteArray.length > 0) {
        //     const draggable = false;
        //     const addWayPoints = false;

        //     const plan = L.Routing.plan(
        //         latLngRouteArray.map((latLng) =>
        //             L.latLng(latLng[0], latLng[1]),
        //         ),
        //         {
        //             draggableWaypoints: draggable,
        //             addWaypoints: addWayPoints,
        //             createMarker: (
        //                 _: number,
        //                 waypoint: L.Routing.Waypoint,
        //                 // eslint-disable-next-line @typescript-eslint/no-unused-vars
        //                 __: number,
        //             ) =>
        //                 L.marker(waypoint.latLng, {
        //                     draggable: draggable,
        //                     icon: L.icon({
        //                         iconUrl: "/bus-stop.svg",
        //                         iconSize: [16, 16],
        //                     }),
        //                 }).bindPopup(
        //                     `<button class="hover:bg-black">Go Here</button>`,
        //                 ),
        //         },
        //     );

        //     L.Routing.control({
        //         plan: plan,
        //         router: L.Routing.osrmv1({
        //             serviceUrl: "http://router.project-osrm.org/route/v1/",
        //         }),
        //         show: false,
        //         lineOptions: {
        //             extendToWaypoints: false,
        //             missingRouteTolerance: 100,
        //             addWaypoints: addWayPoints,
        //             styles: [
        //                 {
        //                     color: "#0d372a",
        //                     opacity: 1,
        //                     weight: 4,
        //                     stroke: true,
        //                 },
        //             ],
        //         },
        //     }).addTo(map);
        //     map.fitBounds(findBounds(latLngRouteArray));
        // }

        map.fitBounds(yangon);

        // we need a reference to the added geo json layer
        // to remove it later
        let lastGeoJSONLayer: L.GeoJSON | undefined = undefined;

        geoJSON.subscribe((busLine) => {
            if (busLine === undefined) {
                if (lastGeoJSONLayer !== undefined) {
                    lastGeoJSONLayer.removeFrom(map!);
                }
            } else {
                lastGeoJSONLayer = L.geoJSON(busLine).addTo(map!);
                map!.fitBounds(
                    shiftBoundsLat(
                        findBounds(
                            // flip the coordinate pos from lng,lat to lat,lng
                            busLine?.geometry.coordinates.map((pos) => [
                                pos[1],
                                pos[0],
                            ]),
                        ),
                        // shift slightly for a better view of the journey
                        0.07,
                    ),
                );
            }
        });
    });

    onDestroy(() => {
        map?.remove();
        map = undefined;
    });

    setContext("map", {
        getMap: () => map,
    });
</script>

<div class="absolute -z-10 h-full w-full" bind:this={mapElement}>
    {#if map}
        <slot />
        <!-- <BusStopPopup /> -->
    {/if}
</div>
