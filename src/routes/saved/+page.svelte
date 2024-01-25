<script lang="ts">
    import BottomDrawer from "$lib/components/ui/bottom-drawer/BottomDrawer.svelte";
    import BackButton from "$lib/components/BackButton.svelte";
</script>

<BackButton />
<BottomDrawer let:Scrollable let:Title>
    <Title>
        Saved routes
    </Title>
    <Scrollable>
        Rotes
    </Scrollable>
</BottomDrawer>
