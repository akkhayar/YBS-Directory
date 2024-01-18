export type BusStop = {
    id: string;
    name_en: string;
    name_mm: string;
    road_en: string;
    road_mm: string;
    lat: number;
    lng: number;
};

export type Transit = {
    a: string;
    b: string;
    busLineId: string;
    distance: number;
};

export interface BusLineGeoJSON extends GeoJSON.Feature<GeoJSON.LineString> {
    metadata: {
        agency_id: string;
        color: "red" | "blue" | "cyan" | "brown" | "purple";
        route_id: string;
        stops: string[];
    };
}

export type TransitPathSegment = {
    startStop: BusStop;
    endStop: BusStop;
    busLine?: BusLineGeoJSON; // Optional, as it might be a walking segment
    distance: number; // Distance in meters of the segment
    estimatedTime: number;
    isWalking: boolean;
};

export type TransitPath = {
    segments: TransitPathSegment[];
    totalDistance: number;
    totalTime: number;
};
