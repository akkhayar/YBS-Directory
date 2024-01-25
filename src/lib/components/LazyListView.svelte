<script lang="ts">
    import { FixedSizeArray } from "$lib/fixedArray";
    import { onDestroy, onMount } from "svelte";

    export let items: any[];
    export let initialBuffer = 6;

    let observer: IntersectionObserver;
    let endItems = new FixedSizeArray(3);
    let visibleItems = items.slice(
        0,
        items.length < initialBuffer ? items.length : initialBuffer,
    );

    onMount(() => {
        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && endItems.includes(entry.target)) {
                        visibleItems = [
                            ...visibleItems,
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

        const elements = document.querySelectorAll(".bscw");
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
    <div class="bscw" use:observe>
        <slot data={item} />
    </div>
{/each}
