import { writable } from "svelte/store";

type SearchStore<T> = {
    data: T[];
    filtered: T[];
    search: string;
};

export function createSearchStore<T>(data: T[], index: (val: T) => string) {
    // filter bus stop objects based on name
    const uniqueData = Object.values(data.reduce(
        (prev, cur) => {
            prev[index(cur)] = cur;
            return prev;
        },
        {} as { [key: string]: T },
    ));

    const { subscribe, set, update } = writable({
        data: uniqueData,
        filtered: uniqueData,
        search: "",
    });

    return {
        subscribe,
        set,
        update,
    };
}

export function searchHandler<T>(store: SearchStore<T>, searchable: (val: T) => string) {
    const searchTerm = store.search.toLowerCase();
    store.filtered = store.data.filter((item) => {
        return searchable(item).includes(searchTerm);
    });
}
