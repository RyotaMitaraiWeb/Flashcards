import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';
import { useUserStore } from '../../stores/user/user';
import { IsGuestGuard } from './isGuest';

describe('IsGuestGuard', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('Returns true if the the user\'s id is 0', () => {
    const store = useUserStore();
    store.restartUser();

    const result = IsGuestGuard();
    expect(result).toBe(true);
  });

  it('Returns an object to redirect to home if the user\'s id is different from 0', () => {
    const store = useUserStore();
    store.setUser({ id: 1, username: 'a' });

    const result = IsGuestGuard();
    expect(result).toEqual({ name: 'home' });
  });
});