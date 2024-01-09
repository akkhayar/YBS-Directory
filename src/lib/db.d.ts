export type BusStop = {
    id: string;
    name_en: string;
    name_mm: string;
    road_en: string;
    road_mm: string;
    lat: number;
    lng: number;
};

export type BusLineMetadata = {
    id: number;
    busLineId: string;
    firstStopId: string;
    lastStopId: string;
};

export interface BusLineGeoJSON extends GeoJSON.Feature<GeoJSON.LineString> {
    metadata: {
        agency_id: string;
        color: "red" | "blue" | "cyan" | "brown" | "purple";
        route_id: string;
        stops: number[];
    };
}
