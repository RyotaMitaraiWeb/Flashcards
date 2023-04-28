import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/vue';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import SearchField from './SearchField.vue';

const vuetify = createVuetify({
  components,
  directives,
});

describe('SearchField', () => {
  it('Renders successfully', async () => {
    const { container } = render(SearchField, {
      global: {
        plugins: [vuetify],
      }
    });

    screen.getAllByText('Search decks by title');
    screen.getByText('The search is case insensitive');

    const field = container.querySelector('input') as Element;
    await fireEvent.update(field, 'a');

    expect((field as HTMLInputElement).value).toBe('a');
  });
});