<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import CataloguePartial from '../Partials/CataloguePartial.vue';
document.title = 'Browse your decks';
</script>
<template>
  <section>
    <h1>Browse your decks</h1>
    <CataloguePartial api-endpoint="/decks/own"></CataloguePartial>
  </section>
</template>

<style scoped lang="scss">
h1 {
  text-align: center;
  margin-bottom: 20px;
}

section {
  margin-top: 30px;
}
</style>