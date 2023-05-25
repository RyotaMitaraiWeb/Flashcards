import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/vue';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import FlashcardsListVue from './FlashcardsList.vue';
import type { IFlashcard } from '../../../types/components/decks';

const vuetify = createVuetify({
  components,
  directives,
});

describe('FlashcardsList component', () => {
  it('Renders correctly with one pair', async () => {
    const flashcards: IFlashcard[] = [
      {
        front: 'front side',
        back: 'back side',
      },
    ];

    render(FlashcardsListVue, {
      props: {
        flashcards,
      },
      global: {
        plugins: [vuetify],
      },
    });

    const pairs = document.querySelector('.flashcard-pair');
    expect(pairs).toBeNull();

    const toggler = await screen.findByText(/Open/i);
    await fireEvent.click(toggler);

    const pairs2 = document.querySelectorAll('.flashcard-pair');
    expect(pairs2.length).toBe(1);

    const hr = document.querySelector('hr');
    expect(hr).toBeNull();

    await screen.findByText('front side');
    await screen.findByText('back side');
  });

  it('Renders correctly with 2+ pairs', async () => {
    const flashcards: IFlashcard[] = [
      {
        front: 'front side',
        back: 'back side',
      },
      {
        front: 'some front',
        back: 'some back',
      },
    ];

    render(FlashcardsListVue, {
      props: {
        flashcards,
      },
      global: {
        plugins: [vuetify],
      },
    });
    const toggler = await screen.findByText(/Open/i);
    await fireEvent.click(toggler);

    const pairs2 = document.querySelectorAll('.flashcard-pair');
    expect(pairs2.length).toBe(2);

    const hr = document.querySelectorAll('hr');
    expect(hr.length).toBe(1);

    await screen.findByText('front side');
    await screen.findByText('back side');
    await screen.findByText('some front');
    await screen.findByText('some back');
  });
});
