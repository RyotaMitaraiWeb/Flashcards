import { vi, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/vue';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import SearchField from './SearchField.vue';
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
      path: '/decks/search',
      component: HomeVue,
    },
    {
      path: '/',
      component: HomeVue
    }
  ]
})

describe('SearchField', () => {
  it('Renders successfully', async () => {
    const { container } = render(SearchField, {
      global: {
        plugins: [vuetify, router],
      }
    });

    screen.getAllByText('Search decks by title');
    screen.getByText('The search is case insensitive');

    const field = container.querySelector('input') as Element;
    await fireEvent.update(field, 'a');

    expect((field as HTMLInputElement).value).toBe('a');
  });

  it('Clears input after submitting', async () => {
    const { container } = render(SearchField, {
      global: {
        plugins: [vuetify, router],
      }
    });

    vi.spyOn(router, 'push').mockImplementation(async () => { });

    screen.getAllByText('Search decks by title');
    screen.getByText('The search is case insensitive');

    const field = container.querySelector('input') as Element;
    await fireEvent.update(field, 'a');
    const form = document.querySelector('form') as Element;
    await fireEvent.submit(form);

    const updatedField = document.querySelector('input') as HTMLInputElement;
    expect(updatedField.value).toBe('');
    expect(router.push).toHaveBeenCalled();
  });

  it('Does nothing if input is empty', async () => {
    const { container } = render(SearchField, {
      global: {
        plugins: [vuetify, router],
      }
    });

    vi.spyOn(router, 'push').mockImplementation(async () => { });

    screen.getAllByText('Search decks by title');
    screen.getByText('The search is case insensitive');

    const field = container.querySelector('input') as Element;
    await fireEvent.update(field, '');
    const form = document.querySelector('form') as Element;
    await fireEvent.submit(form);

    expect(router.push).not.toHaveBeenCalled();
  });
});