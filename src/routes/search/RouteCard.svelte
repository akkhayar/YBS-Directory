<script lang="ts">
    import type { TransitPathSegment, TransitPath } from "$lib/database.d";
    export let journey: TransitPath;
    
    const segmentShade = (segment: TransitPathSegment, offset: number = 0) => {
        return segmentIndexShade[journey.segments.indexOf(segment) + offset];
    };

    const segmentIndex = (segment: TransitPathSegment) => {
        return journey.segments.indexOf(segment);
    };

    const isFirstSegment = (segment: TransitPathSegment) => {
        return journey.segments.indexOf(segment) === 0;
    };

    const isLastSegment = (segment: TransitPathSegment) => {
        return (
            journey.segments.indexOf(segment) === journey.segments.length - 1
        );
    };

    // Conversion factors
    const metersInKilometer = 1000;
    const metersInMile = 1609.34;

    function formatDistance(distanceInMeters: number): string {
        // Convert distance to miles and kilometers
        const distanceInKilometers = distanceInMeters / metersInKilometer;
        const distanceInMiles = distanceInMeters / metersInMile;

        // Determine the appropriate unit based on the distance
        const unit =
            distanceInKilometers > distanceInMiles ? "kilometers" : "miles";

        // Choose the appropriate distance and unit
        const formattedDistance =
            unit === "miles"
                ? distanceInMiles.toFixed(2) + " miles"
                : distanceInKilometers.toFixed(2) + " km";

        return formattedDistance;
    }
    const backdropRounded = (segment: TransitPathSegment) => {
        return isFirstSegment(segment)
            ? "rounded-l-3xl"
            : isLastSegment(segment)
              ? "rounded-tr-3xl rounded-r-3xl"
              : "";
    };

    const significanceValues = journey.segments.map(
        (segment) => segment.estimatedTime,
    );

    const sortedSignificanceValues = [...significanceValues];
    sortedSignificanceValues.sort((a, b) => a - b);

    // Map each number to its position in the sorted array
    let totalGridCols = 0;
    const colSpanClasses = significanceValues.map((num) => {
        const colSpan = sortedSignificanceValues.indexOf(num) + 2;
        totalGridCols += colSpan;
        if (colSpan === 1) return "";
        return `grid-column: span ${colSpan} / span ${colSpan};`;
    });

    const totalGridColsStyle = `grid-template-columns: repeat(${totalGridCols}, minmax(0, 1fr));`;

    const segmentIndexShade = [
        "#ffedad",
        "#ffdd65",
        "#ffc700",
        "#ff9e00",
        "#ff6d00",
        "#ff3d00",
        "#c30000",
        "#8f0000",
        "#5c0000",
        "#290000",
    ];
</script>

<div class="border-b border-b-slate-300">
    <div
        class="grid h-16 gap-0 rounded-3xl bg-white"
        style={totalGridColsStyle}
    >
        {#each journey.segments as segment}
            <!-- the background color is needed for single segment routes
            because it is used to connect between segment cards -->
            <div
                class={backdropRounded(segment)}
                style="background-color: {journey.segments.length === 1 ? 'transparent': segmentShade(segment,1)};{colSpanClasses[segmentIndex(segment)]}"
            >
                <div
                    class="rounded-3xl {isFirstSegment(segment) ||
                        'rounded-l-none'} flex h-full flex-col items-center justify-center p-3"
                    style="background-color: {segmentShade(segment)};"
                >
                    {#if segment.isWalking}
                        <div>
                            <div class="flex">
                                <img src="/walking.svg" alt="walk-img" />
                                <div class="ps-2 text-xs">
                                    {formatDistance(segment.distance)}
                                </div>
                            </div>
                            <div class="text-xs font-light text-gray-700">
                                {segment.estimatedTime} mins
                            </div>
                        </div>
                    {:else}
                        <div class="flex">
                            <img src="/bus.svg" alt="bus-img" />
                            <div class="Poppins ps-2 text-base">
                                {segment.busLine?.metadata.route_id.split('-')[0]}
                            </div>
                        </div>
                        <div class="Poppins text-xs font-light text-gray-700">
                            {segment.estimatedTime} mins
                        </div>
                    {/if}
                </div>
            </div>
        {/each}
    </div>
    <div class="mt-3 flex justify-between">
        <div
            class="flex h-7 justify-between rounded-3xl"
            style="background-color: var(--color-secondary-white)"
        >
            <p class="Poppins mx-3 my-2 w-fit text-xs">Malikha - Time City</p>
        </div>

        <a href="/route">
            <img src="/right-arrow.svg" alt="right-arrow" />
        </a>
    </div>
</div>
