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
      },
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
      },
    });

    await fireEvent.mouseOver(element.baseElement);

    const tooltip = await element.findByText('Settings');
    expect(tooltip).not.toBeNull();
  });

  it("Does not render when the screen is smaller than Vuetify's sm breakpoint", () => {
    const smallVuetify = createVuetify({
      components,
      directives,
      display: {
        mobileBreakpoint: 'sm',
        thresholds: {
          xs: 0,
          sm: 1500,
          md: 1501,
          lg: 1502,
          xl: 1503,
        },
      },
    });

    const { container } = render(SettingsButton, {
      global: {
        plugins: [smallVuetify, router],
      },
    });

    const element = container.querySelector('.gear');
    expect(element).toBeNull();
  });
});
