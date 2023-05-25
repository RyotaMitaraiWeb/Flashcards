import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/vue';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { allowedPreferences } from '../../../../constants/allowedPreferences';
import PalettePickerVue from './PalettePicker.vue';

const vuetify = createVuetify({
  components,
  directives,
});

describe('ThemeToggler component', () => {
  it('Renders the correct amount of PaletteOption components', async () => {
    render(PalettePickerVue, {
      global: {
        plugins: [vuetify],
      },
    });

    const options = document.querySelectorAll('.option');
    expect(options.length).toBe(allowedPreferences.palettes.length);
  });
});
