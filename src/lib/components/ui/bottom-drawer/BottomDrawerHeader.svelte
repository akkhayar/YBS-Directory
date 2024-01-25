<script lang="ts">
    import Title from "$lib/components/ui/bottom-drawer/BottomDrawerTitle.svelte";
    import Title2 from "$lib/components/ui/bottom-drawer/BottomDrawerTitle2.svelte";
</script>

<div class="my-6">
    <slot {Title} {Title2} />
</div>