import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import FlashcardBodyVue from './FlashcardBody.vue';

const vuetify = createVuetify({
  components,
  directives,
});

describe('FlashcardBody component', () => {
  it('Renders correctly (no bold prop)', async () => {
    render(FlashcardBodyVue, {
      props: {
        content: 'flashcard content',
        bold: false,
      },
      global: {
        plugins: [vuetify],
      }
    });

    await screen.findByText('flashcard content');
    const strong = document.querySelector('strong');
    expect(strong).toBeNull();
  });

  it('Renders correctly (with bold)', async () => {
    render(FlashcardBodyVue, {
      props: {
        content: 'flashcard content',
        bold: true,
      },
      global: {
        plugins: [vuetify],
      }
    });

    await screen.findByText('flashcard content');
    const strong = document.querySelector('strong');
    expect(strong).not.toBeNull();
  });
});