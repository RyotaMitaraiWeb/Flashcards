import { invalidActionsMessages } from '../../constants/invalidActionsMessages';
import { useSnackbarStore } from '../../stores/snackbar/snackbar';
import { useUserStore } from '../../stores/user/user';

/**
 * Returns ``true`` if the user is a guest or an object to redirect the user to the home page
 * 
 * This is done by checking the global state and verifying if the user's ``id`` is 0.
 */
export function IsGuestGuard() {
  const store = useUserStore();
  const user = store.user;
  const snackbar = useSnackbarStore();

  if (user.id === 0) {
    return true;
  }

  snackbar.open(invalidActionsMessages.isNotLoggedOut, 'error');
  return { name: 'home' };
}