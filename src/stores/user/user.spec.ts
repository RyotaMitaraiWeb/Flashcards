import { setActivePinia, createPinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';
import { useUserStore } from './user';
import type { IUserState } from '../../types/store/store';

describe('userStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('Initializes state successfully', () => {
    const store = useUserStore();
    const user: IUserState = store.user;
    expect(user).toEqual<IUserState>({
      id: 0,
      username: '',
    });
  });

  it('setUser works', () => {
    const store = useUserStore();
    store.setUser({
      id: 1,
      username: 'a',
    });

    const user: IUserState = store.user;
    expect(user).toEqual<IUserState>({
      id: 1,
      username: 'a',
    });
  });

  it('restartUser works', () => {
    const store = useUserStore();

    store.setUser({
      id: 1,
      username: 'a',
    });

    store.restartUser();

    const user: IUserState = store.user;
    expect(user).toEqual<IUserState>({
      id: 0,
      username: '',
    });
  });
});
