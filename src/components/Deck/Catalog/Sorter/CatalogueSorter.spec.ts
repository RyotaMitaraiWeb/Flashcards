import { describe, it, expect } from 'vitest';
import CatalogueSorterVue from './CatalogueSorter.vue';
import { render, screen } from '@testing-library/vue';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import { createRouter, createWebHistory } from 'vue-router';
import HomeVue from '../../../../views/Home.vue';
import { createTestingPinia } from '@pinia/testing';
import { useLoadingStore } from '../../../../stores/loading/loading';

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
    },
  ],
});

describe('CatalogueSorter component', () => {
  it('Renders and behaves correctly', async () => {
    const pinia = createTestingPinia({
      stubActions: false,
    });

    render(CatalogueSorterVue, {
      global: {
        plugins: [vuetify, router, pinia],
      },
      props: {
        sortBy: 'title',
        order: 'desc',
        endpoint: 'a',
      },
    });

    await screen.findByLabelText('Sort by');
    await screen.findByText('Title (descending)');

    const loadingStore = useLoadingStore();
    await loadingStore.startLoading();

    const disabledSelect = document.querySelector(':disabled');
    expect(disabledSelect).not.toBeNull();
  });
});
