<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useTheme } from 'vuetify/lib/framework.mjs';
import Header from './components/Header/Header.vue';
import Snackbar from './components/Snackbar/Snackbar.vue';

const themeProvider = useTheme();
</script>

<template>
  <v-theme-provider with-background>
    <v-layout id="layout">
      <Header></Header>
      <main id="main" :class="`${themeProvider.global.name.value} ${themeProvider.themes.value.light.colors.primary}`">
        <RouterView />
      </main>
    </v-layout>
    <Snackbar></Snackbar>
  </v-theme-provider>
</template>

<style lang="scss" scoped>
#main {
  height: 100vh;
  display: flex;
  place-items: center;
  flex-direction: column;
}

#layout {
  display: flex;
  flex-direction: column;
}
</style>