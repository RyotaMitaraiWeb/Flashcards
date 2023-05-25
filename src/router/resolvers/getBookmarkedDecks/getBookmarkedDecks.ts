import type { NavigationGuardNext, RouteLocation } from 'vue-router';
import { get } from '../../../util/request/request';
import type { ICatalogueDeck } from '../../../types/components/decks';
import { useSnackbarStore } from '../../../stores/snackbar/snackbar';
import { invalidActionsMessages } from '../../../constants/invalidActionsMessages';
import { api } from '../../../constants/api';
import { useUserStore } from '../../../stores/user/user';
import { storeToRefs } from 'pinia';

/**
 /**
 * Retrieves the user's bookmarked decks (by making a GET request to
 * ``/decks/own``) and attaches the result to ``route.meta.decks`` if the
 * server responds with 200.
 * 
 * If the user is not logged in (aka their id in the user store is 0), the function
 * does not make a request to the server at all.
 *
 * @param route 
 * @param _from 
 * @param next 
 */
export async function getBookmarkedDecks(
  route: RouteLocation,
  _from: RouteLocation,
  next: NavigationGuardNext
): Promise<void> {
  const snackbar = useSnackbarStore();
  const userStore = useUserStore();
  const userRef = storeToRefs(userStore);
  const user = userRef.user;

  if (user.value.id !== 0) {
    try {
      const { res, data } = await get<ICatalogueDeck[]>(api.endpoints.bookmarks.saved);

      if (res.ok) {
        route.meta['decks'] = data;
      } else if (res.status >= 500) {
        snackbar.open(invalidActionsMessages.requestFailed, 'error');
      }
    } catch {
      snackbar.open(invalidActionsMessages.requestFailed, 'error');
    }
  }

  next();
}
