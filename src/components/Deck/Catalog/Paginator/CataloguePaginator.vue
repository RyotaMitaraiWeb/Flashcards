<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLoadingStore } from '../../../../stores/loading/loading';

export interface IPaginator {
  total: number;
  page?: number;
  endpoint: string;
}

const props = defineProps<IPaginator>();

const pages = Math.ceil(props.total / 6);

const route = useRoute();
const router = useRouter();
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