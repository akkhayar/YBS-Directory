import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { BusLineGeoJSON } from "$lib/database.d";

const sample: number[][] = [];
export const route = writable(sample);
export const geoJSON: Writable<BusLineGeoJSON | undefined> = writable(undefined);
