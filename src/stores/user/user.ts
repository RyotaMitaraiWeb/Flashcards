import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { IUserState } from '../../types/store/store';

export const useUserStore = defineStore('user', () => {
  const user = ref<IUserState>({
    id: 0,
    username: '',
  });

  function setUser(data: IUserState) {
    user.value.id = data.id;
    user.value.username = data.username;
  }

  function restartUser() {
    user.value.id = 0;
    user.value.username = '';
  }

  return { user, setUser, restartUser };
});