<script lang="ts">
  import BottomNavBarItem from "$lib/components/BottomNavBarItem.svelte";
</script>

<div
  class="px-6 py-5 pt-1 inherit flex justify-around h-fit w-screen absolute bottom-0 sm:w-80 sm:p-0 sm:top-16 sm:left-20 sm:ms-2 sm:justify-between"
>
  <BottomNavBarItem icon="bus.svg" label="Buslines" url="/buslines" />
  <BottomNavBarItem icon="bookmark-filled.svg" label="Saved" url="/saved" />
  <BottomNavBarItem icon="chat-16-filled.svg" label="Updates" url="/updates" />
</div>
