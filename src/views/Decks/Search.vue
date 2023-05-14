<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useRoute } from 'vue-router';
import CataloguePartial from '../Partials/CataloguePartial.vue';
import { watch } from 'vue';

const route = useRoute();

const query = route.query;
const title = query.title || '';
document.title = `Search results for "${title}"`;

watch(route, () => {
  document.title = `Search results for "${route.query.title || ''}"`;
})
</script>

<template>
  <section>
    <h1>Search results for "{{ $route.query.title }}"</h1>
    <CataloguePartial api-endpoint="/decks/search"></CataloguePartial>
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