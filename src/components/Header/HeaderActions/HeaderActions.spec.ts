import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/vue';
import { createRouter, createWebHistory } from 'vue-router';
import HomeVue from '../../../views/Home.vue';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { useUserStore } from '../../../stores/user/user';
import HeaderActions from './HeaderActions.vue';
import { createTestingPinia } from "@pinia/testing";

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
  ],
});

describe('HeaderActions', () => {  
  it('Displays register and login buttons when the user\'s id is 0', () => {
    const pinia = createTestingPinia({
      stubActions: false,
    });

    const store = useUserStore();
    store.restartUser();

    render(HeaderActions, {
      global: {
        plugins: [vuetify, router, pinia],
      },
    });

    screen.getByText('Login');
    screen.getByText('Register');
  });

  it('Displays logout and profile buttons when the user\'s id is different from 0', async () => {
    const pinia = createTestingPinia({
      stubActions: false,
    });
  
    const store = useUserStore();
    store.setUser({
      id: 1,
      username: 'a',
    });

    render(HeaderActions, {
      global: {
        plugins: [vuetify, router, pinia],
      },
    });

    screen.getByText('Logout');
    screen.getByText('My decks');
  });
});