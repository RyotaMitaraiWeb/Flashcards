import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/vue';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { createTestingPinia } from '@pinia/testing';
import Snackbar from './Snackbar.vue';
import { useSnackbarStore } from '../../stores/snackbar/snackbar';

const vuetify = createVuetify({
  components,
  directives,
});

import.meta.env.VITE_SNACKBAR_TIMEOUT = 10_000_000;

describe('Snackbar component', () => {
  it('Renders correctly (text is string)', () => {
    const pinia = createTestingPinia({
      stubActions: false,
    });

    const store = useSnackbarStore();
    store.open('snackbar message', 'error');

    const { container } = render(Snackbar, {
      global: {
        plugins: [vuetify, pinia],
      },
    });

    screen.getByText('snackbar message');
    const p = document.querySelectorAll('p');

    expect(p.length).toBe(1);
  });

  it('Renders correctly (text is an array of strings)', () => {
    const pinia = createTestingPinia({
      stubActions: false,
    });
    const store = useSnackbarStore();
    store.open(['snackbar', 'message'], 'error');

    const { container } = render(Snackbar, {
      global: {
        plugins: [vuetify, pinia],
      },
    });

    screen.getByText('snackbar');
    screen.getByText('message');
    const p = document.querySelectorAll('p');
    expect(p.length).toBe(2);
  });

  it('Does not render if snackbar open state is closed', () => {
    const pinia = createTestingPinia({
      stubActions: false,
    });

    const { container } = render(Snackbar, {
      global: {
        plugins: [vuetify, pinia],
      },
    });

    const p = document.querySelectorAll('p');
    expect(p.length).toBe(0);
  });
});
