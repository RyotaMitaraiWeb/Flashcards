<script setup lang="ts">
import { useMenuStore } from '../../../stores/mobile-menu/mobile-menu';
import CloseButton from './CloseButton/CloseButton.vue';
import MenuItem from './MenuItem/MenuItem.vue';
import SearchField from './Search/SearchField.vue';

const menuStore = useMenuStore();
const menu = menuStore.menu;
</script>

<template>
  <v-navigation-drawer v-model="menu.open" temporary location="left" id="menu">
      <SearchField></SearchField>
      <v-list>
        <MenuItem title="Home" value="home" icon="mdi-home" to="/"></MenuItem>
        <MenuItem title="All Decks" value="alldecks" icon="mdi-view-list" to="/decks/all"></MenuItem>
        <MenuItem title="Settings" value="settings" icon="mdi-cog" to="/account/settings"></MenuItem>
        <CloseButton></CloseButton>
      </v-list>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped>
#menu {
  form {
  width: 90%;
  display: block;
  margin: 1em auto;
}
}
</style>