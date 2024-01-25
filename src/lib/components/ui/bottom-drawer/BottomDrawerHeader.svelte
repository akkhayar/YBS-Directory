<script lang="ts">
    import Title from "$lib/components/ui/bottom-drawer/BottomDrawerTitle.svelte";
    import Title2 from "$lib/components/ui/bottom-drawer/BottomDrawerTitle2.svelte";
</script>

<div class="mt-4 mb-3">
    <slot {Title} {Title2} />
</div>