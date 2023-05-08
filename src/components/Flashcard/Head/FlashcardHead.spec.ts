import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/vue';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import FlashcardHeadVue from './FlashcardHead.vue';

const vuetify = createVuetify({
  components,
  directives,
});

describe('LeftArrow component', () => {
  it('Renders correctly', async () => {
    render(FlashcardHeadVue, {
      global: {
        plugins: [vuetify],
      }
    });

    const head = document.querySelector('.flashcard-head');
    expect(head).not.toBeNull();
  });
});