<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useTheme } from 'vuetify/lib/framework.mjs';
import Header from './components/Header/Header.vue';
const themeProvider = useTheme();
</script>

<template>
  <v-theme-provider with-background>
    <v-layout id="layout">
      <main :class="`${themeProvider.global.name.value} ${themeProvider.themes.value.light.colors.primary}`">
        <Header></Header>
        <RouterView />
      </main>
    </v-layout>
  </v-theme-provider>
</template>