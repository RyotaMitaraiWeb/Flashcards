import { beforeEach, describe, it } from 'vitest';
import { render, screen } from '@testing-library/vue';
import { createRouter, createWebHistory } from 'vue-router';
import HomeVue from '../../views/Home.vue';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { useUserStore } from '../../stores/user/user';
import { createTestingPinia } from "@pinia/testing";
import Header from './HeaderTestWrapper.test.vue';

const vuetify = createVuetify({
  components,
  directives,
});

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', component: HomeVue },
    { path: '/', component: HomeVue },
    { path: '/logout', component: HomeVue },
    { path: '/decks/own', component: HomeVue },
    { path: '/account/settings', component: HomeVue },
    { path: '/register', component: HomeVue },
    { path: '/decks/all', component: HomeVue },
  ],
});

describe('Header', () => {
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

  it('Displays correct title for users with id 0', () => {
    const pinia = createTestingPinia({
      stubActions: false,
    });

    const store = useUserStore();
    store.restartUser();

    render(Header, {
      global: {
        plugins: [vuetify, router, pinia],
      },
    });

    screen.getByText('Welcome!');
  });

  it('Displays correct title for users with id different from 0', () => {
    const pinia = createTestingPinia({
      stubActions: false,
    });

    const store = useUserStore();
    store.setUser({
      id: 1,
      username: 'a',
    });

    render(Header, {
      global: {
        plugins: [vuetify, router, pinia],
      },
    });

    screen.getByText('Welcome, a!');
  });
});