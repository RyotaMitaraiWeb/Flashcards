import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import MobileFlashcardFormVue from './MobileFlashcardForm.vue';
import type { IFlashcard } from '../../../../../types/components/decks';

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
    };
  }

  return flashcards;
}

describe('MobileFlashcardForm component', () => {
  describe('General', () => {
    it('Renders correctly if no flashcard props are passed to it', async () => {
      render(MobileFlashcardFormVue, {
        global: {
          plugins: [vuetify],
        },
      });

      await screen.findByText('1 / 1');
    });

    it('Renders correctly if flashcard props are passed to it', async () => {
      render(MobileFlashcardFormVue, {
        global: {
          plugins: [vuetify],
        },
        props: {
          flashcards: deckSeed(5, 'flashcard test'),
        },
      });

      await screen.findByText('1 / 5');
      await screen.findAllByDisplayValue('flashcard test');
    });

    it('Switches between sides and maintains their state successfully', async () => {
      render(MobileFlashcardFormVue, {
        global: {
          plugins: [vuetify],
        },
      });

      const frontSide = document.querySelector('.flashcard-input-wrapper.front') as HTMLElement;
      const backSide = document.querySelector('.flashcard-input-wrapper.back') as HTMLElement;

      expect(backSide.style.display).toBe('none');

      const frontTab = await screen.findByLabelText('Switch to front side');
      const backTab = await screen.findByLabelText('Switch to back side');

      const textarea = document.querySelector('textarea');

      await fireEvent.update(textarea as Element, 'test');

      await fireEvent.click(backTab);

      expect(frontSide.style.display).toBe('none');

      await fireEvent.click(frontTab);

      expect(backSide.style.display).toBe('none');
      expect(textarea?.value).toBe('test');
    });
  });

  describe('Arrow buttons', () => {
    it('Arrow buttons switch cards successfully', async () => {
      render(MobileFlashcardFormVue, {
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
      render(MobileFlashcardFormVue, {
        global: {
          plugins: [vuetify],
        },
        props: {
          flashcards: deckSeed(2),
        },
      });

      const nextButton = await screen.findByLabelText('Move to next flashcard');
      await fireEvent.click(nextButton);

      expect(nextButton.classList.contains('invisible')).toBe(true);
    });

    it('Left arrow button does not display when there is only one card', async () => {
      render(MobileFlashcardFormVue, {
        global: {
          plugins: [vuetify],
        },
      });

      const previousButton = await screen.findByLabelText('Move to previous flashcard');
      expect(previousButton.classList.contains('invisible')).toBe(true);
    });

    it('Both can be shown and hidden together', async () => {
      render(MobileFlashcardFormVue, {
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

    it('Left arrow switches to front side successfully', async () => {
      render(MobileFlashcardFormVue, {
        global: {
          plugins: [vuetify],
        },
        props: {
          flashcards: deckSeed(5),
        },
      });

      const backSide = document.querySelector('.flashcard-input-wrapper.back') as HTMLElement;
      const nextButton = await screen.findByLabelText('Move to next flashcard');
      const previousButton = await screen.findByLabelText('Move to previous flashcard');
      const backTab = await screen.findByLabelText('Switch to back side');

      await fireEvent.click(nextButton);
      await fireEvent.click(backTab);

      await fireEvent.click(previousButton);

      expect(backSide.style.display).toBe('none');
    });

    it('Right arrow switches to front side successfully', async () => {
      render(MobileFlashcardFormVue, {
        global: {
          plugins: [vuetify],
        },
        props: {
          flashcards: deckSeed(5),
        },
      });

      const backSide = document.querySelector('.flashcard-input-wrapper.back') as HTMLElement;
      const nextButton = await screen.findByLabelText('Move to next flashcard');
      const backTab = await screen.findByLabelText('Switch to back side');

      await fireEvent.click(backTab);

      await fireEvent.click(nextButton);

      expect(backSide.style.display).toBe('none');
    });

    it('Cards maintain their text even if switched', async () => {
      render(MobileFlashcardFormVue, {
        global: {
          plugins: [vuetify],
        },
        props: {
          flashcards: deckSeed(5),
        },
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
      render(MobileFlashcardFormVue, {
        global: {
          plugins: [vuetify],
        },
      });

      const addButton = await screen.findByText('Add');
      await fireEvent.click(addButton);

      await screen.findByText('2 / 2');
    });

    it('Switches to front side', async () => {
      render(MobileFlashcardFormVue, {
        global: {
          plugins: [vuetify],
        },
      });

      const addButton = await screen.findByText('Add');
      const backSide = document.querySelector('.flashcard-input-wrapper.back') as HTMLElement;

      const backTab = await screen.findByLabelText('Switch to back side');

      await fireEvent.click(backTab);
      await fireEvent.click(addButton);
      expect(backSide.style.display).toBe('none');
    });
  });

  describe('Delete button', () => {
    it('Delete button works correctly if the user is not on the first card', async () => {
      render(MobileFlashcardFormVue, {
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
      render(MobileFlashcardFormVue, {
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
      render(MobileFlashcardFormVue, {
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

    it('Switches to front side when clicked', async () => {
      render(MobileFlashcardFormVue, {
        global: {
          plugins: [vuetify],
        },
        props: {
          flashcards: deckSeed(5),
        },
      });

      const deleteButton = await screen.findByText('Delete');
      const backSide = document.querySelector('.flashcard-input-wrapper.back') as HTMLElement;

      const backTab = await screen.findByLabelText('Switch to back side');

      await fireEvent.click(backTab);

      await fireEvent.click(deleteButton);

      expect(backSide.style.display).toBe('none');
    });
  });
});
