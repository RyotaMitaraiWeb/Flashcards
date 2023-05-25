import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/vue';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { allowedPreferences } from '../../../../../constants/allowedPreferences';
import PaletteOptionVue from './PaletteOption.vue';

const vuetify = createVuetify({
  components,
  directives,
});

describe('PaletteOption component', () => {
  it('Renders and behaves correctly (current theme does not match the option)', async () => {
    localStorage.setItem('palette', allowedPreferences.palettes[1]);
    render(PaletteOptionVue, {
      global: {
        plugins: [vuetify],
      },
      props: {
        value: allowedPreferences.palettes[0], // 'deepPurple'
      },
    });

    const unchecked = document.querySelector(':checked');
    expect(unchecked).toBeNull();

    const radio = await screen.findByLabelText('Deep purple');
    await fireEvent.click(radio);

    const checked = document.querySelector(':checked');
    expect(checked).not.toBeNull();
  });

  it('Renders correctly (current theme matches the option)', async () => {
    localStorage.setItem('palette', allowedPreferences.palettes[0]);
    render(PaletteOptionVue, {
      global: {
        plugins: [vuetify],
      },
      props: {
        value: allowedPreferences.palettes[0], // 'deepPurple'
      },
    });

    const checked = document.querySelector(':checked');
    expect(checked).not.toBeNull();
  });
});
