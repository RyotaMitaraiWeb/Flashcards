import { describe, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/vue';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import ThemeTogglerVue from './ThemeToggler.vue';
import { allowedPreferences } from '../../../../constants/allowedPreferences';

const vuetify = createVuetify({
  components,
  directives,
});

describe('ThemeToggler component', () => {
  it('Renders and behaves correctly', async () => {
    render(ThemeTogglerVue, {
      global: {
        plugins: [vuetify],
      },
    });

    const toggler = await screen.findByLabelText('switch to dark mode');

    await fireEvent.click(toggler);

    const darkToggler = await screen.findByLabelText('switch to light mode');
    await fireEvent.click(darkToggler);

    await screen.findByLabelText('switch to dark mode');
  });

  it('Renders and behaves correctly if localStorage does not have the default theme', async () => {
    localStorage.setItem('theme', allowedPreferences.themes[1]);

    render(ThemeTogglerVue, {
      global: {
        plugins: [vuetify],
      },
    });

    const darkToggler = await screen.findByLabelText('switch to light mode');
    await fireEvent.click(darkToggler);

    const lightToggler = await screen.findByLabelText('switch to dark mode');
    await fireEvent.click(lightToggler);

    await screen.findByLabelText('switch to light mode');
  });
});
