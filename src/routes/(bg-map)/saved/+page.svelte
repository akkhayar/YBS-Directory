<script lang="ts">
    import BottomDrawer from "$lib/components/ui/bottom-drawer/BottomDrawer.svelte";
    import BackButton from "$lib/components/ui/BackButton.svelte";
    import AlertWorkInProgress from "$lib/components/ui/AlertWorkInProgress.svelte";
    import HideSearchBar from "$lib/components/ui/HideSearchBar.svelte";
</script>

<BackButton />
<HideSearchBar />
<BottomDrawer let:Scrollable let:Header>
    <Header let:Title>
        <Title>Saved routes</Title>
    </Header>
    <Scrollable>Routes</Scrollable>
</BottomDrawer>
<AlertWorkInProgress />
