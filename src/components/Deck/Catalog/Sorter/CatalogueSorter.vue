<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useSnackbarStore } from '../../../../stores/snackbar/snackbar';
import { ref } from 'vue';
import { get } from '../../../../util/request/request';
import type { ICatalogueList } from '../../../../types/components/decks';
import { api } from '../../../../constants/api';
import { invalidActionsMessages } from '../../../../constants/invalidActionsMessages';
import type { IHttpError } from '../../../../types/components/IHttpError';
import { useLoadingStore } from '../../../../stores/loading/loading';
import { formatQueriesToString } from '../../../../util/formatQueriesToString/formatQueriesToString';

export interface ICatalogueSorter {
  sortBy?: string;
  order?: string;
  endpoint: string;
}

const props = defineProps<ICatalogueSorter>();
const emit = defineEmits(['updateSort']);

const sortCategories = [
  {
    displayName: 'Title (ascending)',
    sort: 'title-asc',
  },
  {
    displayName: 'Title (descending)',
    sort: 'title-desc',
  },
  {
    displayName: 'Date created (ascending)',
    sort: 'createdAt-asc',
  },
  {
    displayName: 'Date created (descending)',
    sort: 'createdAt-desc',
  },
  {
    displayName: 'Last updated (ascending)',
    sort: 'updatedAt-asc',
  },
  {
    displayName: 'Last updated (descending)',
    sort: 'updatedAt-desc',
  },
]

const sortBy = ref(props.sortBy || 'title');
const order = ref(props.order || 'asc');

const displayName = sortCategories
  .find(sc => sc.sort === `${sortBy.value}-${order.value}`)?.displayName
  || sortCategories[0].displayName;

const currentSortCategory = ref({
  displayName,
  sort: `${sortBy.value}-${order.value}`,
});

const route = useRoute();
const router = useRouter();
const loadingStore = useLoadingStore();
const snackbar = useSnackbarStore();

async function sort() {
  // sort property is formatted as {category}-{order}
  const [sortBy, order] = currentSortCategory.value.sort.split('-');

  await router.push({
    ...router.currentRoute,
    query: {
      ...route.query,
      sortBy,
      order,
    },
  });

  const queries = formatQueriesToString(route.query);

  try {
    const { res, data } = await get<ICatalogueList>(api.root + props.endpoint + queries);
    if (!res.ok) {
      const errors = (data as unknown) as IHttpError;
      snackbar.open(errors.message, 'error');
    } else {
      const list = data!;
      emit('updateSort', list);
    }
  } catch {
    snackbar.open(invalidActionsMessages.requestFailed, 'error');
  }
}
</script>

<template>
  <v-select
    class="sort-toggle"
    return-object
    v-model="currentSortCategory"
    :items="sortCategories"
    item-title="displayName"
    item-value="sort"
    aria-label="Sort by"
    label="Sort by"
    :disabled="loadingStore.loading.status"
    @update:model-value="sort"
  >
  </v-select>
</template>

<style scoped lang="scss">
.sort-toggle {
  width: 400px;
  margin: 0 auto;

  @media screen and (max-width: 450px) {
    width: 260px;
  }
}
</style>