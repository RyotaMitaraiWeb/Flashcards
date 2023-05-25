import type { RouteLocation } from 'vue-router';
import { get } from '../../../util/request/request';
import type { ICatalogueDeck } from '../../../types/components/decks';
import { useSnackbarStore } from '../../../stores/snackbar/snackbar';
import { invalidActionsMessages } from '../../../constants/invalidActionsMessages';
import { api } from '../../../constants/api';

/**
 * Retrieves a list of decks and attaches them to the route meta.
 *
 * The resolver will take the current path and send a request to the server
 * with that path as the endpoint (this will include any query parameters in the URL).
 * If the server responds with 200, the result is attached to ``route.meta.decks``,
 * otherwise, the resolver returns a redirect object (aborting the request)
 * and opens a snackbar notification to indicate an error.
 *
 * **Example:**
 * if ``route``'s ``fullPath`` is ``/decks/all?page=2``, the resolver will send a
 * request to ``/decks/all?page=2``. In other words:
 * * **Client URL:** http://localhost:5173/decks/all?page=2
 * * **Server URL:** http://localhost:3000/decks/all?page=2
 * @param route
 * @returns A Promise that resolves to ``true`` if it retrieves a list of decks successfuly or a redirect object
 * to the home page otherwise.
 */
export async function getCatalogueDecks(route: RouteLocation) {
  const snackbar = useSnackbarStore();
  const url = route.fullPath;
  try {
    const { res, data } = await get<ICatalogueDeck[]>(api.root + url);

    if (res.ok) {
      route.meta['decks'] = data;
      return true;
    } else {
      snackbar.open(invalidActionsMessages.requestFailed, 'error');
      return { name: 'home' };
    }
  } catch {
    snackbar.open(invalidActionsMessages.requestFailed, 'error');
    return { name: 'home' };
  }
}
