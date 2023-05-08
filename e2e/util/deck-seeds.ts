import { HttpStatus } from '../../src/constants/httpstatus';
import type { IDeck } from '../../src/types/components/decks';

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