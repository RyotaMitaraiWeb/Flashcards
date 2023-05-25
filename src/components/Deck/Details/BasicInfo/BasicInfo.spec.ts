import { describe, it } from 'vitest';
import BasicInfoVue from './BasicInfo.vue';
import type { IDeck } from '../../../../types/components/decks';
import { render, screen } from '@testing-library/vue';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { toShortDate } from '../../../../util/toShortDate/toShortDate';

const vuetify = createVuetify({
  components,
  directives,
});

const deck: IDeck = {
  title: 'test deck',
  description: 'some description',
  bookmarked: false,
  id: 1,
  authorId: 1,
  createdAt: '2023-05-03T08:58:28.830Z',
  updatedAt: '2023-05-03T08:58:28.830Z',
  flashcards: [
    {
      front: 'a',
      back: 'a',
    },
  ],
};

describe('BasicInfo component', () => {
  it('Renders correctly (has never been updated)', async () => {
    render(BasicInfoVue, {
      props: {
        deck,
      },
      global: {
        plugins: [vuetify],
      },
    });

    const date = toShortDate(deck.createdAt);

    await screen.findByText(deck.title);
    await screen.findByText(deck.description);
    await screen.findByText(new RegExp(`^Created on: ${date}$`));
  });

  it('Renders correctly (has been updated)', async () => {
    const updatedDeck = { ...deck };
    updatedDeck.updatedAt = '2023-06-03T08:58:28.830Z';
    render(BasicInfoVue, {
      props: {
        deck: updatedDeck,
      },
      global: {
        plugins: [vuetify],
      },
    });

    const createdAt = toShortDate(updatedDeck.createdAt);
    const updatedAt = toShortDate(updatedDeck.updatedAt);

    await screen.findByText(deck.title);
    await screen.findByText(deck.description);
    await screen.findByText(`Created on: ${createdAt}. Last updated on: ${updatedAt}`);
  });
});
