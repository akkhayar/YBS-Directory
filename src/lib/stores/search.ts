import { writable } from "svelte/store";
import type { BusStop } from "$lib/db";

type SearchStore = {
    data: BusStop[];
    filtered: BusStop[];
    search: string;
};

export function createSearchStore(data: BusStop[]) {
    const { subscribe, set, update } = writable({
        data,
        filtered: data,
        search: "",
    });

    return {
        subscribe,
        set,
        update,
    };
}

export function searchHandler(store: SearchStore) {
    const searchTerm = store.search.toLowerCase();
    store.filtered = store.data.filter((item) => {
        return item.name.toLowerCase().includes(searchTerm);
    });
}
