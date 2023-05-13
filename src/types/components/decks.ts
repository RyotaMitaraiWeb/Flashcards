export interface IDeck {
  title: string;
  description: string;
  bookmarked: boolean;
  id: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  flashcards: IFlashcard[];
}

export interface IFlashcard {
  front: string;
  back: string;
}

/**
 * ```typescript
 * interface ICatalogueList {
    decks: ICatalogueDeck[];
    total: number;
  }
 * ```
 */
export interface ICatalogueList {
  decks: ICatalogueDeck[];
  total: number;
}

/**
 * ```typescript
 * interface ICatalogueDeck {
    id: number;
    title: string;
    description: string;
    authorId: number;
    createdAt: string;
    updatedAt: string;
  }
 * ```
 */
export interface ICatalogueDeck {
  id: number;
  title: string;
  description: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
}