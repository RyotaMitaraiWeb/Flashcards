<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import type { ICatalogueList } from '../../types/components/decks';
import CatalogueDeck from '../../components/Deck/Catalog/CatalogueDeck/CatalogueDeck.vue';
import CataloguePaginator from '../../components/Deck/Catalog/Paginator/CataloguePaginator.vue';
import CatalogueSorter from '../../components/Deck/Catalog/Sorter/CatalogueSorter.vue';
import { watch } from 'vue';
import { formatQueriesToString } from '../../util/formatQueriesToString/formatQueriesToString';
import { get } from '../../util/request/request';
import { api } from '../../constants/api';
import { invalidActionsMessages } from '../../constants/invalidActionsMessages';
import type { IHttpError } from '../../types/components/IHttpError';
import { useSnackbarStore } from '../../stores/snackbar/snackbar';
export interface ICataloguePartial {
  apiEndpoint: string;
}

const props = defineProps<ICataloguePartial>();

const route = useRoute();
const path = route.path;
const list = ref(route.meta['decks'] as ICatalogueList);

const page = Number(route.query.page) || 1;

const sortBy = route.query.sortBy as string;
const order = route.query.order as string;

const snackbar = useSnackbarStore();
watch(route, async () => {
  if (path !== route.path) {
    return;
  }

  const queries = formatQueriesToString(route.query);
  try {
    const { res, data } = await get<ICatalogueList>(api.root + props.apiEndpoint + queries);
    if (!res.ok) {
      const errors = data as unknown as IHttpError;
      snackbar.open(errors.message, 'error');
    } else {
      list.value = data!;
    }
  } catch {
    snackbar.open(invalidActionsMessages.requestFailed, 'error');
  }
});
</script>

<template>
  <CatalogueSorter :endpoint="apiEndpoint" :sort-by="sortBy" :order="order"></CatalogueSorter>
  <template v-if="list.decks.length > 0">
    <template v-for="deck in list.decks" :key="deck.id">
      <CatalogueDeck :deck="deck"></CatalogueDeck>
    </template>
    <p class="items">Showing {{ list.decks.length }} out of {{ list.total }} items</p>
  </template>
  <template v-else>
    <h2>No decks found!</h2>
  </template>
  <CataloguePaginator :endpoint="apiEndpoint" :total="list.total" :page="page"></CataloguePaginator>
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
