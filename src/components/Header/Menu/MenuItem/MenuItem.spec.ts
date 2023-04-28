import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/vue';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import MenuItem from './MenuItem.vue';
import { createRouter, createWebHistory } from 'vue-router';
import HomeVue from '../../../../views/Home.vue';

const vuetify = createVuetify({
  components,
  directives,
});

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeVue },
  ],
});

describe('MenuItem', () => {
  it('Renders successfully', async () => {
    const { container } = render(MenuItem, {
      global: {
        plugins: [vuetify, router],
      },
      props: {
        title: 'Home',
        value: '1',
        to: '/',
        icon: 'mdi-home',
      }
    });

    screen.getByText('Home');
    const icon = container.querySelector('i.mdi-home');
    
    expect(icon).not.toBeNull();

    const link = container.querySelector('a');
    expect(link?.href.endsWith('/')).toBe(true);
  });
});