import { describe, it, expect } from 'vitest';

import { render, screen } from '@testing-library/vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import EditButtonVue from './EditButton.vue';
import { createRouter, createWebHistory } from 'vue-router';
import HomeVue from '../../../../views/Home.vue';

const vuetify = createVuetify({
  components,
  directives,
});

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
    }
  ]
})

describe('EditButton', () => {
  it('Renders correctly', async () => {
    const { container } = render(EditButtonVue, {
      props: {
        id: 1,
      },
      global: {
        plugins: [vuetify, router]
      }
    });

    await screen.findByText('Edit');
    const a = container.querySelector('a');
    expect(a?.href.includes('/decks/1/edit')).toBe(true);
  });
});