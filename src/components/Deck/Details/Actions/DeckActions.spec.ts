import { describe, it, expect, vi } from 'vitest';
import DeckActionsVue from './DeckActions.vue';
import { render, screen, fireEvent } from '@testing-library/vue';

import { createTestingPinia } from '@pinia/testing';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import { createRouter, createWebHistory } from 'vue-router';
import HomeVue from '../../../../views/Home.vue';
import { useUserStore } from '../../../../stores/user/user';
import type { IDeck, IFlashcard } from '../../../../types/components/decks';
import * as requestFunctions from '../../../../util/request/request';
import { HttpStatus } from '../../../../constants/httpstatus';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/decks/:id/edit',
      component: HomeVue,
    },
    {
      path: '/',
      component: HomeVue,
    },
  ],
});

const vuetify = createVuetify({
  components,
  directives,
});

const pinia = createTestingPinia({
  stubActions: false,
});

const flashcards: IFlashcard[] = [
  {
    front: 'front side',
    back: 'back side',
  },
];

const deck: IDeck = {
  title: 'Some deck',
  description: 'Long description',
  bookmarked: false,
  id: 1,
  authorId: 1,
  createdAt: '2023-04-22T09:00:13.900Z',
  updatedAt: '2023-04-22T09:00:13.900Z',
  flashcards,
};

describe('DeckActions component', () => {
  it('Renders correctly for all users (including guests)', async () => {
    const userStore = useUserStore();
    await userStore.restartUser();

    render(DeckActionsVue, {
      props: {
        deck,
      },
      global: {
        plugins: [vuetify, pinia, router],
      },
    });

    const buttons = document.querySelectorAll('.action-btn');
    expect(buttons.length).toBe(1);

    await screen.findByText('Start studying');
    await screen.findByText('Actions');
  });

  it('Renders correctly for logged in users that have not bookmarked the deck', async () => {
    const userStore = useUserStore();
    await userStore.setUser({
      id: 2,
      username: 'ryota1',
    });

    render(DeckActionsVue, {
      props: {
        deck,
      },
      global: {
        plugins: [vuetify, pinia, router],
      },
    });

    const buttons = document.querySelectorAll('.action-btn');
    expect(buttons.length).toBe(2);

    await screen.findByText('Bookmark');
  });

  it('Renders correctly for logged in users that have bookmarked the deck', async () => {
    const userStore = useUserStore();
    await userStore.setUser({
      id: 2,
      username: 'ryota1',
    });

    const bookmarkedDeck = { ...deck };
    bookmarkedDeck.bookmarked = true;

    render(DeckActionsVue, {
      props: {
        deck: bookmarkedDeck,
      },
      global: {
        plugins: [vuetify, pinia, router],
      },
    });

    const buttons = document.querySelectorAll('.action-btn');
    expect(buttons.length).toBe(2);

    await screen.findByText('Remove bookmark');
  });

  it('Changes bookmark button dynamically', async () => {
    const userStore = useUserStore();
    await userStore.setUser({
      id: 2,
      username: 'ryota1',
    });

    render(DeckActionsVue, {
      props: {
        deck,
      },
      global: {
        plugins: [vuetify, pinia, router],
      },
    });

    vi.spyOn(requestFunctions, 'post').mockImplementation(async () => {
      const res = new Response(undefined, { status: HttpStatus.CREATED });
      return { res, data: {} };
    });

    vi.spyOn(requestFunctions, 'del').mockImplementation(async () => {
      const res = new Response(undefined, { status: HttpStatus.NO_CONTENT });
      return { res, data: undefined };
    });

    const bookmarkBtn = await screen.findByText('Bookmark');
    await fireEvent.click(bookmarkBtn);

    const buttonsAfterBookmark = document.querySelectorAll('.action-btn');
    expect(buttonsAfterBookmark.length).toBe(2);

    const removeBookmarkBtn = await screen.findByText('Remove bookmark');
    await fireEvent.click(removeBookmarkBtn);

    const buttonsAfterRemovedBookmark = document.querySelectorAll('.action-btn');
    expect(buttonsAfterRemovedBookmark.length).toBe(2);

    await screen.findByText('Bookmark');
  });

  it('Renders correctly for authors of the deck', async () => {
    const userStore = useUserStore();
    await userStore.setUser({
      id: deck.authorId,
      username: 'ryota1',
    });

    render(DeckActionsVue, {
      props: {
        deck,
      },
      global: {
        plugins: [vuetify, pinia, router],
      },
    });

    const buttons = document.querySelectorAll('.action-btn');
    expect(buttons.length).toBe(3);

    await screen.findByText('Delete');
    await screen.findByText('Edit');
  });
});
