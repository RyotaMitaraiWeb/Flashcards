/**
 * ```typescript
 * interface IDeck {
    title: string;
    description: string;
    bookmarked: boolean;
    id: number;
    authorId: number;
    createdAt: string;
    updatedAt: string;
    flashcards: IFlashcard[];
}
 * ```
 */
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

/**
 * interface IFlashcard {
    front: string;
    back: string;
}
 */
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

/**
 * ```typescript
 * interface IUpdateContent {
    side: 'front' | 'back';
    value: string;
  }
 * ```
 */
export interface IUpdateContent {
  side: 'front' | 'back';
  value: string;
}

/**
 * ```typescript
 * interface ICreatedDeck {
    id: number;
  }
 * ```
 */
export interface ICreatedDeck {
  id: number;
}

/**
 * ```typescript
 * interface IDeckSubmission {
    id: number;
    title: string;
    description: string;
    flashcards: IFlashcard[];
  }
 * ```
 */
export interface IDeckSubmission {
  id: number;
  title: string;
  description: string;
  flashcards: IFlashcard[];
}
