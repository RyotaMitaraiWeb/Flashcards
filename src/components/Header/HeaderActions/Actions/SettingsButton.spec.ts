import { describe, it, expect } from 'vitest';
import SettingsButton from './SettingsButton.vue';
import { fireEvent, render } from '@testing-library/vue';
import { createRouter, createWebHistory } from 'vue-router';
import HomeVue from '../../../../views/Home.vue';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
});

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/account/settings', component: HomeVue },
    { path: '/', component: HomeVue },
  ],
});

describe('SettingsButton', () => {
  it('Renders correctly', () => {
    const { container } = render(SettingsButton, {
      global: {
        plugins: [vuetify, router],
      }
    });

    const link = container.querySelector('a');
    expect(link?.href.endsWith('/account/settings')).toBe(true);

    const icon = container.querySelector('i.mdi-cog');
    expect(icon).not.toBeNull();

    const gearBtn = container.querySelector('span.gear');
    expect(gearBtn).not.toBeNull();
  });

  it('Displays tooltip with correct text when hovered', async () => {
    const element = render(SettingsButton, {
      global: {
        plugins: [vuetify, router],
      }
    });

    await fireEvent.mouseOver(element.baseElement);

    const tooltip = await element.findByText('Settings');
    expect(tooltip).not.toBeNull();
  });
});