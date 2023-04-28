import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/vue';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { createTestingPinia } from '@pinia/testing';
import { useMenuStore } from '../../../../stores/mobile-menu/mobile-menu';
import CloseButton from './CloseButton.vue';

const vuetify = createVuetify({
  components,
  directives,
});

describe('CloseButton', () => {
  it('Closes the menu upon a click successfully', async () => {
    const pinia = createTestingPinia({
      stubActions: false,
    });

    const store = useMenuStore();
    store.open();

    if (!store.menu.open) {
      throw new Error('State did not update successfully');
    }

    render(CloseButton, {
      global: {
        plugins: [vuetify, pinia],
      }
    });

    const element = screen.getByText('Close');
    await fireEvent.click(element);

    expect(store.menu.open).toBe(false);
  });
});