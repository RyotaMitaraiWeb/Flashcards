import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/vue';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import LeftArrowVue from './LeftArrow.vue';

const vuetify = createVuetify({
  components,
  directives,
});

describe('LeftArrow component', () => {
  it('Renders correctly', async () => {
    render(LeftArrowVue, {
      global: {
        plugins: [vuetify],
      },
    });

    await screen.findByLabelText('Move to previous flashcard');
  });
});
