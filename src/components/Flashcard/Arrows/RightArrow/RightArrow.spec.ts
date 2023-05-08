import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/vue';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import RightArrowVue from './RightArrow.vue';

const vuetify = createVuetify({
  components,
  directives,
});

describe('RightArrow component', () => {
  it('Renders correctly', async () => {
    render(RightArrowVue, {
      global: {
        plugins: [vuetify],
      }
    });

    await screen.findByLabelText('Move to next flashcard');
  });
});