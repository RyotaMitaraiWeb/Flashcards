import { describe, it } from 'vitest';

import { render, screen } from '@testing-library/vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import StartButtonVue from './StartButton.vue';

const vuetify = createVuetify({
  components,
  directives,
});

describe('StartButton component', () => {
  it('Renders correctly', async () => {
      render(StartButtonVue, {
      global: {
        plugins: [vuetify]
      }
    });

    await screen.findByText('Start studying');
  });
});