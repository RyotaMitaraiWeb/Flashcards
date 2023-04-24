import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ILoadingState} from '../../types/store/store';

export const useLoadingStore = defineStore('loading', () => {
  const loading = ref<ILoadingState>({
    status: false,
  });

  function startLoading() {
    loading.value.status = true;
  }

  function stopLoading() {
    loading.value.status = false;
  }

  return { loading, startLoading, stopLoading };
});