import type { RouteLocation } from 'vue-router';
import { invalidActionsMessages } from '../../constants/invalidActionsMessages';
import { useSnackbarStore } from '../../stores/snackbar/snackbar';
import { useUserStore } from '../../stores/user/user';
import type { IDeck } from '../../types/components/decks';

export function IsOwnerGuard(route: RouteLocation) {
  const snackbar = useSnackbarStore();
  const { user } = useUserStore();

  const deck = route.meta.deck as IDeck | undefined;

  if (!deck) {
    snackbar.open(invalidActionsMessages.deckDoesNotExist, 'error');
    return { name: '404' };
  }

  const authorId = deck.authorId;

  if (user.id !== authorId) {
    snackbar.open(invalidActionsMessages.isNotCreator, 'error');
    return { name: 'home' };
  }

  return true;
}
