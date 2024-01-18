<script lang="ts">
    import BackButton from "$lib/components/BackButton.svelte";
</script>

<BackButton />

<div
    class="bg-glass Poppins absolute bottom-8 left-5 right-5 rounded-3xl p-5 text-white"
>
    <p>Malikha Housing - Kudos Bakery</p>
    <div class="flex justify-start text-3xl">
        <p class="text-primary-100">21</p>
        <p>-</p>
        <p class="text-primary-100">145</p>
    </div>
    <p class="text-lg">Time Estimate: approx. 30 mins</p>
    <div class="flex justify-between items-end">
        <p class="text-xs font-light text-light">
            To bus stop: 3mins <br />
            On bus: 24 mins <br />
            To destination: 3mins
        </p>
        <button
            class="custom-box-shadow h-fit w-fit border border-solid rounded-full bg-white px-5 py-2 text-black border-primary-100">Select</button
        >
    </div>
</div>
