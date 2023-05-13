<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { get } from '../../../../util/request/request';
import type { ICatalogueList } from '../../../../types/components/decks';
import { useSnackbarStore } from '../../../../stores/snackbar/snackbar';
import type { IHttpError } from '../../../../types/components/IHttpError';
import { invalidActionsMessages } from '../../../../constants/invalidActionsMessages';
import { api } from '../../../../constants/api';
import { useLoadingStore } from '../../../../stores/loading/loading';
import { formatQueriesToString } from '../../../../util/formatQueriesToString/formatQueriesToString';

export interface IPaginator {
  total: number;
  page?: number;
  endpoint: string;
}

const props = defineProps<IPaginator>();
const emit = defineEmits(['updatePage']);

const pages = Math.ceil(props.total / 6);

const route = useRoute();
const router = useRouter();
const snackbar = useSnackbarStore();
const loadingStore = useLoadingStore();

const page = ref(props.page || 1);

async function paginate() {
  await router.push({
    ...router.currentRoute,
    query: {
      ...route.query,
      page: page.value,
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
      emit('updatePage', list);
    }
  } catch {
    snackbar.open(invalidActionsMessages.requestFailed, 'error');
  }
}

</script>

<template>
  <v-pagination
    :length="pages"
    :total-visible="5"
    v-model="page"
    :disabled="loadingStore.loading.status"
    @update:model-value="paginate"
  >
  </v-pagination>
</template>