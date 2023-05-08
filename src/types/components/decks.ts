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