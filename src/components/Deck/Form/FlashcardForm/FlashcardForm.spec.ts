import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import FlashcardFormVue from './FlashcardForm.vue';
import type { IFlashcard } from '../../../../types/components/decks';

const vuetify = createVuetify({
  components,
  directives,
});

function deckSeed(n: number = 1, text = '') {
  const flashcards: IFlashcard[] = [];

  for (let i = 0; i < n; i++) {
    flashcards[i] = {
      front: text,
      back: text,
    }
  }

  return flashcards;
}

describe('FlashcardForm component', () => {
  describe('General', () => {
    it('Renders correctly if no flashcard props are passed to it', async () => {
      render(FlashcardFormVue, {
        global: {
          plugins: [vuetify],
        },
      });

      await screen.findByText('1 / 1');
    });

    it('Renders correctly if flashcard props are passed to it', async () => {
      render(FlashcardFormVue, {
        global: {
          plugins: [vuetify],
        },
        props: {
          flashcards: deckSeed(5, 'flashcard test'),
        }
      });

      await screen.findByText('1 / 5');
      await screen.findAllByDisplayValue('flashcard test');
    });
  });

  describe('Arrow buttons', () => {
    it('Arrow buttons switch cards successfully', async () => {
      render(FlashcardFormVue, {
        global: {
          plugins: [vuetify],
        },
        props: {
          flashcards: deckSeed(5),
        },
      });

      const nextButton = await screen.findByLabelText('Move to next flashcard');
      const previousButton = await screen.findByLabelText('Move to previous flashcard');

      await fireEvent.click(nextButton);

      await screen.findByText('2 / 5');

      await fireEvent.click(previousButton);

      await screen.findByText('1 / 5');
    });

    it('Right arrow button does not display when there is only one card', async () => {
      render(FlashcardFormVue, {
        global: {
          plugins: [vuetify],
        },
        props: {
          flashcards: deckSeed(2),
        }
      });

      const nextButton = await screen.findByLabelText('Move to next flashcard');
      await fireEvent.click(nextButton);

      expect(nextButton.classList.contains('invisible')).toBe(true);
    });

    it('Left arrow button does not display when there is only one card', async () => {
      render(FlashcardFormVue, {
        global: {
          plugins: [vuetify],
        },
      });

      const previousButton = await screen.findByLabelText('Move to previous flashcard');
      expect(previousButton.classList.contains('invisible')).toBe(true);
    });

    it('Both can be shown and hidden together', async () => {
      render(FlashcardFormVue, {
        global: {
          plugins: [vuetify],
        },
      });

      const add = await screen.findByText('Add');

      const nextButton = await screen.findByLabelText('Move to next flashcard');
      const previousButton = await screen.findByLabelText('Move to previous flashcard');

      expect(nextButton.classList.contains('invisible')).toBe(true);
      expect(previousButton.classList.contains('invisible')).toBe(true);

      await fireEvent.click(add);
      await fireEvent.click(add);

      await fireEvent.click(previousButton);

      expect(nextButton.classList.contains('invisible')).toBe(false);
      expect(previousButton.classList.contains('invisible')).toBe(false);
    });

    it('Cards maintain their text even if switched', async () => {
      render(FlashcardFormVue, {
        global: {
          plugins: [vuetify],
        },
        props: {
          flashcards: deckSeed(5),
        }
      });

      const textarea = document.querySelector('textarea');
      await fireEvent.update(textarea as HTMLElement, 'test');

      const nextButton = await screen.findByLabelText('Move to next flashcard');
      const previousButton = await screen.findByLabelText('Move to previous flashcard');

      await fireEvent.click(nextButton);
      await fireEvent.click(previousButton);

      expect(textarea?.value).toBe('test');
    });
  });

  describe('Add button', () => {
    it('Add button works correctly', async () => {
      render(FlashcardFormVue, {
        global: {
          plugins: [vuetify],
        },
      });

      const addButton = await screen.findByText('Add');
      await fireEvent.click(addButton);

      await screen.findByText('2 / 2');
    });
  });

  describe('Delete button', () => {
    it('Delete button works correctly if the user is not on the first card', async () => {
      render(FlashcardFormVue, {
        global: {
          plugins: [vuetify],
        },
        props: {
          flashcards: deckSeed(5),
        },
      });

      const nextButton = await screen.findByLabelText('Move to next flashcard');

      await fireEvent.click(nextButton);
      await fireEvent.click(nextButton);

      const removeButton = await screen.findByText('Delete');
      await fireEvent.click(removeButton);

      await screen.findByText('2 / 4');
    });

    it('Delete button works correctly if the user is on the first card', async () => {
      render(FlashcardFormVue, {
        global: {
          plugins: [vuetify],
        },
        props: {
          flashcards: deckSeed(5),
        },
      });

      const removeButton = await screen.findByText('Delete');
      await fireEvent.click(removeButton);

      await screen.findByText('1 / 4');
    });

    it('Delete button is not displayed if there is only one flashcard', async () => {
      render(FlashcardFormVue, {
        global: {
          plugins: [vuetify],
        },
      });

      const invisibleDeleteButton = document.querySelector('.delete-btn') as HTMLElement;
      expect(invisibleDeleteButton.style.display).toBe('none');

      const addButton = await screen.findByText('Add');
      await fireEvent.click(addButton);

      const visibleDeleteButton = document.querySelector('.delete-btn') as HTMLElement;
      expect(visibleDeleteButton.style.display).toBe('');
    });
  });
});