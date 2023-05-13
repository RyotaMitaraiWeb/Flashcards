<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import type { ICatalogueList } from '../../types/components/decks';
import CatalogueDeck from '../../components/Deck/Catalog/CatalogueDeck/CatalogueDeck.vue';
import CataloguePaginator from '../../components/Deck/Catalog/Paginator/CataloguePaginator.vue';
import CatalogueSorter from '../../components/Deck/Catalog/Sorter/CatalogueSorter.vue';
export interface ICataloguePartial {
  apiEndpoint: string;
}

defineProps<ICataloguePartial>();

const route = useRoute();
const list = ref(route.meta['decks'] as ICatalogueList);

const page = Number(route.query.page) || 1;

const sortBy = route.query.sortBy as string;
const order = route.query.order as string;
function update(value: ICatalogueList) {
  list.value = value;
}
</script>

<template>
  <CatalogueSorter :endpoint="apiEndpoint" :sort-by="sortBy" :order="order" @update-sort="update"></CatalogueSorter>
  <template v-if="list.decks.length > 0">
    <template v-for="deck in list.decks" :key="deck.id">
      <CatalogueDeck :deck="deck"></CatalogueDeck>
    </template>
    <p class="items">Showing {{ list.decks.length }} out of {{ list.total }} items</p>
  </template>
  <template v-else>
    <h2>No decks found!</h2>
  </template>
  <CataloguePaginator :endpoint="apiEndpoint" :total="list.total" :page="page" @update-page="update"></CataloguePaginator>
</template>

<style lang="scss" scoped>
.items {
  font-size: 10pt;
  font-style: italic;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: -10px;
  text-align: center;
}

h2 {
  text-align: center;
  margin-bottom: 30px;
}
</style>