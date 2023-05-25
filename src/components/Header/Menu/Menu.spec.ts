import { beforeEach, describe, it } from 'vitest';
import { render, screen } from '@testing-library/vue';
import { createRouter, createWebHistory } from 'vue-router';
import HomeVue from '../../../views/Home.vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { createTestingPinia } from '@pinia/testing';

import Menu from './MenuTestWrapper.test.vue';
import { useMenuStore } from '../../../stores/mobile-menu/mobile-menu';
import { useUserStore } from '../../../stores/user/user';

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
    { path: '/account/decks', component: HomeVue },
    { path: '/account/settings', component: HomeVue },
    { path: '/register', component: HomeVue },
    { path: '/decks/all', component: HomeVue },
    { path: '/decks/create', component: HomeVue },
  ],
});

describe('Menu', () => {
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

  it("Renders correctly (user store's id is 0)", () => {
    const pinia = createTestingPinia({
      stubActions: false,
    });

    const store = useMenuStore();
    store.open();

    render(Menu, {
      global: {
        plugins: [vuetify, router, pinia],
      },
    });

    screen.getByText('Home');
    screen.getByText('All Decks');
    screen.getByText('Settings');
    screen.getByText('Close');
    screen.getByText('The search is case insensitive');
  });

  it("Renders correctly (user store's id is different from 0)", () => {
    const pinia = createTestingPinia({
      stubActions: false,
    });

    const user = useUserStore();
    user.setUser({ id: 1, username: 'ryota1' });

    const store = useMenuStore();
    store.open();

    render(Menu, {
      global: {
        plugins: [vuetify, router, pinia],
      },
    });

    screen.getByText('Home');
    screen.getByText('All Decks');
    screen.getByText('Settings');
    screen.getByText('Close');
    screen.getByText('Create a new deck');
    screen.getByText('The search is case insensitive');
  });
});
