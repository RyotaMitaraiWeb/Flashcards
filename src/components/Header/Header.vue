<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import HeaderActions from './HeaderActions/HeaderActions.vue';
import { useUserStore } from '../../stores/user/user';
import Menu from './Menu/Menu.vue';
import NavigationButton from './NavigationButton/NavigationButton.vue';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
</script>

<template>
  <Menu></Menu>
  <v-app-bar color="primary" prominent id="header">
    <template v-slot:prepend>
      <NavigationButton></NavigationButton>
    </template>
    <v-app-bar-title>
      <template v-if="user.id === 0">Welcome!</template>
      <template v-else>Welcome, {{ user.username }}!</template>
    </v-app-bar-title>
    <HeaderActions></HeaderActions>
  </v-app-bar>
</template>

<style lang="scss" scoped>
#header {
  position: relative !important; // initial fixed position is set via style property
  height: 64px;
  overflow: auto;
  transition: background-color 0.2s;
}
</style>
