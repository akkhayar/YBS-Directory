<script lang="ts">
    import BottomNavBarItem from "$lib/components/BottomNavBarItem.svelte";
</script>
  

<div class="absolute bottom-0 p-8 pt-1 flex justify-between w-screen">
    <BottomNavBarItem icon="bus.svg" label="Buslines" url="/buslines" />
    <BottomNavBarItem icon="bookmark-filled.svg" label="Saved" url="/saved" />
    <BottomNavBarItem icon="chat-16-filled.svg" label="Updates" url="/updates" />
</div>
  