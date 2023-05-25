<script setup lang="ts">
import { useMenuStore } from '../../../stores/mobile-menu/mobile-menu';
const { open, menu, close } = useMenuStore();

function toggle() {
  if (menu.open) {
    close();
  } else {
    open();
  }
}
</script>

<template>
  <v-app-bar-nav-icon
    @click.stop="toggle"
    id="menu-btn"
    aria-label="Open menu"
  ></v-app-bar-nav-icon>
</template>
