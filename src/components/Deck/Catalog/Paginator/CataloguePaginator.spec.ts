import { describe, it, beforeEach, expect } from 'vitest';
import CataloguePaginatorVue from './CataloguePaginator.vue';
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

describe('CataloguePaginator component', () => {
  // prevent ResizeObserver not defined error, this isn't testing any resizing
  beforeEach(() => {
    global.ResizeObserver = class ResizeObserver {
      observe() {
        // do nothing
      }
      unobserve() {
        // do nothing
      }
      disconnect() {
        // do nothing
      }
    };
  });

  it('Renders and behaves correctly', async () => {
    const pinia = createTestingPinia({
      stubActions: false,
    });

    render(CataloguePaginatorVue, {
      global: {
        plugins: [vuetify, router, pinia],
      },
      props: {
        total: 31,
        page: 1,
        endpoint: 'a',
      },
    });

    await screen.findByText('1');
    await screen.findByText('2');
    await screen.findByText('3');
    await screen.findByText('4');
    await screen.findByText('...');
    await screen.findByText('6');

    const loadingStore = useLoadingStore();
    await loadingStore.startLoading();

    const disabledButtons = document.querySelector(':disabled');
    expect(disabledButtons).not.toBeNull();
  });
});
