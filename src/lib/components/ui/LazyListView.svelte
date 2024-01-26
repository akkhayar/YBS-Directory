<script lang="ts">
    import { FixedSizeArray } from "$lib/utils";
    import { onDestroy, onMount } from "svelte";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    export let items: any[];
    export let initialBuffer: number;

    let observer: IntersectionObserver;
    let endItems = new FixedSizeArray(3);
    
    $: visibleItems = items.slice(
        0,
        items.length < initialBuffer ? items.length : initialBuffer,
    );

    onMount(() => {
        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && (!endItems.isFull() || endItems.includes(entry.target))) {
                        visibleItems = [
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            ...visibleItems,
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            ...items.slice(
                                visibleItems.length,
                                visibleItems.length + 3,
                            ),
                        ];
                    }
                });
            },
            {
                rootMargin: "50px",
                threshold: 1.0,
            },
        );

        const elements = document.querySelectorAll(".lazy-item");
        elements.forEach((el) => observer.observe(el));
    });

    function observe(node: Element) {
        endItems.add(node);
        if (observer) {
            observer.observe(node);
        }

        return {
            destroy() {
                if (observer) {
                    observer.unobserve(node);
                }
                endItems.remove(node);
            },
        };
    }

    onDestroy(() => {
        if (observer) {
            observer.disconnect();
        }
    });
</script>

{#each visibleItems as item}
    <div class="lazy-item" use:observe>
        <slot data={item} />
    </div>
{/each}
