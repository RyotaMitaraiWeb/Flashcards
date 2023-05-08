import { describe, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/vue';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import ListTogglerVue from './ListTogglerTestWrapper.vue';

const vuetify = createVuetify({
  components,
  directives,
});

describe('ListToggler component', () => {
  it('Renders and behaves correctly', async () => {
    render(ListTogglerVue, {
      global: {
        plugins: [vuetify],
      },
    });

    const openButton = await screen.findByText(/Open list of flashcards/i);
    await fireEvent.click(openButton);

    const closeButton = await screen.findByText(/Close list of flashcards/i);
    await fireEvent.click(closeButton);

    await screen.findByText(/Open list of flashcards/i);
  });
});