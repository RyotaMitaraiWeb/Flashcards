import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useUserStore } from '../../stores/user/user';
import { IsLoggedInGuard } from './isLoggedIn';
import { useSnackbarStore } from '../../stores/snackbar/snackbar';

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

  it('Returns an object to redirect to login if the user\'s id is 0', () => {
    const store = useUserStore();
    store.restartUser();

    const snackbar = useSnackbarStore();
    const spy = vi.spyOn(snackbar, 'open').mockImplementation(() => { });

    const result = IsLoggedInGuard();
    expect(result).toEqual({ name: 'login' });
    expect(spy).toHaveBeenCalled();
  });
});