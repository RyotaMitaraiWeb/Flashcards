import { useUserStore } from '../../stores/user/user';

/**
 * Returns ``true`` if the user is logged in or an object to redirect the user to the login page
 * 
 * This is done by checking the global state and verifying if the user's ``id`` is different from 0.
 */
export function IsLoggedInGuard() {
  const store = useUserStore();
  const user = store.user;
  
  if (user.id !== 0) {
    return true;
  }

  return { name: 'login' };
}