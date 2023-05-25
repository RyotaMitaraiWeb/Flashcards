<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import PaletteSection from '../Partials/PaletteSection.vue';
import ThemeSection from '../Partials/ThemeSection.vue';
</script>

<template>
  <section>
    <h1>Preferences</h1>
    <ThemeSection></ThemeSection>
    <PaletteSection></PaletteSection>
  </section>
</template>

<style lang="scss" scoped>
h1 {
  text-align: center;
}

section {
  margin-top: 30px;
}
</style>
