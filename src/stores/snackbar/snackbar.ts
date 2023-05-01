import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ISnackbarState, snackbarStatus } from '../../types/store/store';

export const useSnackbarStore = defineStore('snackbar', () => {
  const snackbar = ref<ISnackbarState>({
    open: false,
    text: '',
    status: 'info',
  });

  function open(text: string | string[], status: snackbarStatus) {
    snackbar.value.open = true;
    snackbar.value.status = status;
    snackbar.value.text = text;
  }

  function close() {
    snackbar.value.open = false;
  }

  return { snackbar, open, close };
});