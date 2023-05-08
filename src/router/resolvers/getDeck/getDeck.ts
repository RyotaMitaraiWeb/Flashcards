import { type RouteLocation } from 'vue-router';
import type { IDeck } from '../../../types/components/decks';
import { get } from '../../../util/request/request';
import { api } from '../../../constants/api';
import { useSnackbarStore } from '../../../stores/snackbar/snackbar';
import { invalidActionsMessages } from '../../../constants/invalidActionsMessages';

export async function getDeck(to: RouteLocation) {
  const id = Number(to.params['id']) || 0;
  const snackbar = useSnackbarStore();

  try {
    const { res, data } = await get<IDeck>(api.endpoints.decks.id(id));
    if (res.ok) {
      to.meta['deck'] = data;
      return true;
    } else {
      snackbar.open(invalidActionsMessages.deckDoesNotExist, 'error');
      return { name: '404' }
    }
  } catch {
    snackbar.open(invalidActionsMessages.requestFailed, 'error');
    return { name: 'home' }
  }
}