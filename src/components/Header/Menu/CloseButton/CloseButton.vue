<script lang="ts" setup>
import { useMenuStore } from '../../../../stores/mobile-menu/mobile-menu';

const menuStore = useMenuStore();

const { close } = menuStore;
</script>

<template>
  <v-list-item
    id="close-btn"
    @click="close"
    title="Close"
    prepend-icon="mdi-close"
    value="close"
  ></v-list-item>
</template>
