import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ILoadingState, IMobileMenuState} from '../../types/store/store';

export const useMobileMenuStore = defineStore('mobileMenu', () => {
  const menu = ref<IMobileMenuState>({
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