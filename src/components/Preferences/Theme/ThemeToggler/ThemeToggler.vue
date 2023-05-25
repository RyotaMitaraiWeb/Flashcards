<script setup lang="ts">
import { useTheme } from 'vuetify/lib/framework.mjs';
import { getLocalStorageTheme } from '../../../../util/localStorageTheme/localStoragePreferences';
import { ref } from 'vue';

const themeStore = useTheme();
const theme = ref(getLocalStorageTheme());

function updateTheme() {
  const newTheme = theme.value === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', newTheme);
  theme.value = newTheme;  
  themeStore.global.name.value = newTheme;
}
</script>

<template>
  <v-switch 
    :model-value="theme === 'dark'"
    @update:model-value="updateTheme"
    true-icon="mdi-moon-waxing-crescent"
    false-icon="mdi-white-balance-sunny"
    inset
    :class="`theme-toggler ${theme}`"
    :label="`switch to ${theme === 'dark' ? 'light' : 'dark'} mode`"
  >
  </v-switch>
</template>

<style>
i.mdi-moon-waxing-crescent {
  color: rgb(68, 68, 212);
}

i.mdi-white-balance-sunny {
  color: yellow;
  opacity: 1 !important;
}

.theme-toggler label {
  color: transparent;
  position: absolute;
}
</style>

<style lang="scss" scoped>
.theme-toggler {
  display: flex;
  justify-content: center;
}
</style>