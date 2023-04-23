import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';
import { useUserStore } from '../../stores/user/user';
import { IsLoggedInGuard } from './isLoggedIn';

describe('IsGuestGuard', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('Returns true if the the user\'s id is different from 0', () => {
    const store = useUserStore();
    store.setUser({ id: 1, username: 'a' });

    const result = IsLoggedInGuard();
    expect(result).toBe(true);
  });

  it('Returns an object to redirect to login if the user\'s id is different from 0', () => {
    const store = useUserStore();
    store.restartUser();

    const result = IsLoggedInGuard();
    expect(result).toEqual({ name: 'login' });
  });
});