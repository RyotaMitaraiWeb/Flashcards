import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/vue';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import NavigationButton from './NavigationButton.vue';
import { createTestingPinia } from '@pinia/testing';
import { useMenuStore } from '../../../stores/mobile-menu/mobile-menu';

const vuetify = createVuetify({
  components,
  directives,
});

describe('NavigationButton', () => {
  it('Opens and closes the menu upon a click successfully', async () => {
    const pinia = createTestingPinia({
      stubActions: false,
    });

    const store = useMenuStore();

    render(NavigationButton, {
      global: {
        plugins: [vuetify, pinia],
      },
    });

    const element = await screen.findByLabelText('Open menu');
    await fireEvent.click(element);

    expect(store.menu.open).toBe(true);

    await fireEvent.click(element);
    expect(store.menu.open).toBe(false);
  });
});
