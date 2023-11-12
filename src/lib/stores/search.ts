import { writable } from "svelte/store";


export function createSearchStore(data: any) {
    const { subscribe, set, update } = writable({
        data,
        filtered: data,
        search: '',
    });

    return {
        subscribe,
        set,
        update
    };
}

export function searchHandler(store: any) {
    const searchTerm = store.search.toLowerCase() || "";
    store.filtered = store.data.filter((item: any) => {
        return item.stopName.toLowerCase().includes(searchTerm);
    });
}