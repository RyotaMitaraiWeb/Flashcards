import { useUserStore } from '../../stores/user/user';

/**
 * Returns ``true`` if the user is a guest or an object to redirect the user to the home page
 * 
 * This is done by checking the global state and verifying if the user's ``id`` is 0.
 */
export function IsGuestGuard() {
  const store = useUserStore();
  const user = store.user;
  
  if (user.id === 0) {
    return true;
  }

  return { name: 'home' };
}