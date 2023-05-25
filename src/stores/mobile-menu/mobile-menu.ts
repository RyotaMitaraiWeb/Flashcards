import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ILoadingState, IMenuState } from '../../types/store/store';

export const useMenuStore = defineStore('mobileMenu', () => {
  const menu = ref<IMenuState>({
    open: false,
  });

  function open() {
    menu.value.open = true;
  }

  function close() {
    menu.value.open = false;
  }

  return { menu, open, close };
});
