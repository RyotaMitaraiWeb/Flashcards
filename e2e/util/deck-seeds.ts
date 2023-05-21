import { HttpStatus } from '../../src/constants/httpstatus';
import type { ICatalogueDeck, IDeck } from '../../src/types/components/decks';

export function deckSeed(authorId = 1, bookmarked = false) {
  return {
    status: HttpStatus.OK,
    contentType: 'application/json',
    body: JSON.stringify({
      title: 'Deck title',
      description: 'Super long description',
      bookmarked,
      id: 1,
      authorId,
      createdAt: '2023-05-02T15:33:39.690Z',
      updatedAt: '2023-05-02T15:33:39.690Z',
      flashcards: [
        {
          front: 'front text 1',
          back: 'back text 1'
        },
        {
          front: 'front text 2',
          back: 'back text 2'
        },
        {
          front: 'front text 3',
          back: 'back text 3'
        },
      ]
    } as IDeck),
  };
}

export function createDeckSeed() {
  return {
    status: HttpStatus.OK,
    contentType: 'application/json',
    body: JSON.stringify({

      title: 'Deck title',
      description: 'Super long description',
      bookmarked: false,
      id: 1,
      authorId: 1,
      createdAt: '2023-05-02T15:33:39.690Z',
      updatedAt: '2023-05-02T15:33:39.690Z',
      flashcards: [
        {
          front: 'front text 1',
          back: 'back text 1'
        },
      ]
    } as IDeck)
  };
}

export function deckCatalogueSeed(total: number, number = 1) {
  const decks: ICatalogueDeck[] = [];

  for (let i = 0; i < number; i++) {
    const deck: ICatalogueDeck = {
      id: i + 1,
      title: 'Deck #' + (i + 1),
      description: 'Description #' + (i + 1),
      authorId: 1,
      createdAt: '2023-04-22T09:00:36.607Z',
      updatedAt: '2023-04-22T09:00:36.607Z'
    };

    decks.push(deck);
  }

  return {
    status: HttpStatus.OK,
    contentType: 'application/json',
    body: JSON.stringify({
      decks,
      total,
    }),
  };
}