import { describe, it, expect } from 'vitest';
import LinkButton from './LinkButton.vue';
import { render, screen } from '@testing-library/vue';
import { createRouter, createWebHistory } from 'vue-router';
import HomeVue from '../../../../views/Home.vue';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
});

describe('LinkButton', () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/login', component: HomeVue },
      { path: '/', component: HomeVue },
    ],
  });


  it('Renders correctly', () => {
    const { container } = render(LinkButton, {
      props: {
        to: '/login',
        icon: 'mdi-login-variant',
      },
      slots: {
        default: 'Login',
        name: 'Login',
      },
      global: {
        plugins: [vuetify, router],
      }
    });

    screen.getByText('Login');

    const link = container.querySelector('a');
    expect(link?.href.endsWith('/login')).toBe(true);

    const icon = container.querySelector('i.mdi-login-variant');
    expect(icon).not.toBeNull();

    const spanButton = container.querySelector('span.button');
    expect(spanButton).not.toBeNull();
  });
});