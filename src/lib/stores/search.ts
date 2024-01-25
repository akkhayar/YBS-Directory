import { writable } from "svelte/store";
import fuzzysort from "fuzzysort";

/**
 * Creates a search store with a complex object array. 
 * 
 * Returns an object with the data passed in, the filtered list and the
 * search writable.
 * 
 * @param data 
 * @param index 
 * @param searchKey 
 * @returns 
 */
export function createSearchStore<T>(data: T[], index: (val: T) => string, searchKey: string) {
    // filter bus stop objects based on name
    const uniqueData = Object.values(
        data.reduce(
            (prev, cur) => {
                prev[index(cur)] = cur;
                return prev;
            },
            {} as { [key: string]: T },
        ),
    );

    const search = writable("");

    const store = writable({
        data: uniqueData,
        filtered: uniqueData,
        search,
    });

    search.subscribe((searchString) => {
        store.update((model) => {
            if (searchString.trimEnd().length === 0) {
                model.filtered = model.data;
            } else {
                model.filtered = fuzzysort
                    .go(searchString, model.data, { key: searchKey })
                    .map((res) => res.obj);
            }
            return model;
        });
    });
    return store;
}
