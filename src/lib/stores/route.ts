import { writable } from "svelte/store";

const sample: number[][] = [];
export const route = writable(sample);