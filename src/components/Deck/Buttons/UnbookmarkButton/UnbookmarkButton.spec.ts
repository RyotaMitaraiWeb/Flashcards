import { describe, it, vi, expect } from 'vitest';
import UnbookmarkButtonVue from './UnbookmarkButton.vue';
import { render, screen, fireEvent } from '@testing-library/vue';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import { createTestingPinia } from '@pinia/testing';
import { useLoadingStore } from '../../../../stores/loading/loading';
import { useSnackbarStore } from '../../../../stores/snackbar/snackbar';
import * as requestFunctions from '../../../../util/request/request';
import { HttpStatus } from '../../../../constants/httpstatus';

const vuetify = createVuetify({
  components,
  directives,
});

describe('UnbookmarkButton component', () => {
  it('Renders and behaves correctly', async () => {
    const pinia = createTestingPinia({
      stubActions: false,
    });

    const loadingStore = useLoadingStore();
    const snackbar = useSnackbarStore();

    vi.spyOn(requestFunctions, 'del').mockImplementation(async () => {
      const res = new Response(undefined, { status: HttpStatus.CREATED });
      const data = {};

      return { res, data };
    });

    vi.spyOn(snackbar, 'open');

    render(UnbookmarkButtonVue, {
      global: {
        plugins: [vuetify, pinia]
      },
      props: {
        id: 1,
      },
    });

    const btn = await screen.findByText('Remove bookmark');
    await fireEvent.click(btn);

    expect(requestFunctions.del).toHaveBeenCalled();

    await loadingStore.startLoading();

    const element = document.querySelector('button') as HTMLButtonElement;
    expect(element.disabled).toBe(true);
  });
});