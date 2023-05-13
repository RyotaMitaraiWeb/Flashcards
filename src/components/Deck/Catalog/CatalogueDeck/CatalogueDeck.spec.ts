import { describe, it, expect } from 'vitest';
import CatalogueDeckVue from './CatalogueDeck.vue';
import { render, screen } from '@testing-library/vue';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import type { ICatalogueDeck } from '../../../../types/components/decks';
import { createRouter, createWebHistory } from 'vue-router';
import HomeVue from '../../../../views/Home.vue';

const deck: ICatalogueDeck = {
  id: 1,
  title: 'Some deck',
  description: 'Some description',
  authorId: 1,
  createdAt: '2023-04-22T09:00:36.607Z',
  updatedAt: '2023-04-22T09:00:36.607Z'
}

const vuetify = createVuetify({
  components,
  directives,
});

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/decks/:id',
      component: HomeVue,
    },
    {
      path: '/',
      component: HomeVue,
    }
  ]
});

describe('CatalogueDeck component', () => {
  it('Renders correctly (has never been updated)', async () => {
    const { container } = render(CatalogueDeckVue, {
      global: {
        plugins: [vuetify, router]
      },
      props: {
        deck,
      },
    });

    await screen.findByText('Some deck');
    await screen.findByText('Some description');
    await screen.findByText('To deck');
    await screen.findByText(/^Created on: 22.04.2023$/mi);

    const link = container.querySelector('a');
    expect(link?.href.includes('/decks/1')).toBe(true);
  });

  it('Renders correctly (has been updated)', async () => {
    const updatedDeck = { ...deck };
    updatedDeck.updatedAt = '2023-04-23T09:00:36.607Z'
    render(CatalogueDeckVue, {
      global: {
        plugins: [vuetify, router]
      },
      props: {
        deck: updatedDeck,
      },
    });

    await screen.findByText('Created on: 22.04.2023. Last updated on: 23.04.2023');
  });
});