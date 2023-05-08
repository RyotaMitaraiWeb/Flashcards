import { describe, it, expect, vi } from 'vitest';

import { fireEvent, render, screen } from '@testing-library/vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import DeleteButtonVue from './DeleteButton.vue';
import { createRouter, createWebHistory } from 'vue-router';
import HomeVue from '../../../../views/Home.vue';
import { createTestingPinia } from '@pinia/testing';
import * as requestFunctions from '../../../../util/request/request';
import { HttpStatus } from '../../../../constants/httpstatus';
import { useLoadingStore } from '../../../../stores/loading/loading';

const vuetify = createVuetify({
  components,
  directives,
});

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/decks/:id/edit',
      component: HomeVue,
    },
    {
      path: '/',
      component: HomeVue,
    }
  ]
})

describe('DeleteButton', () => {
  it('Renders and behaves correctly', async () => {
    const pinia = createTestingPinia({
      stubActions: false,
    });

    render(DeleteButtonVue, {
      props: {
        id: 1,
      },
      global: {
        plugins: [vuetify, router, pinia]
      }
    });

    await screen.findByText('Delete');

    const loadingStore = useLoadingStore();
    await loadingStore.startLoading();

    const element = document.querySelector('button') as HTMLButtonElement;
    expect(element.disabled).toBe(true);
  });

  it('Calls del when clicked', async () => {
    const pinia = createTestingPinia({
      stubActions: false,
    });

    vi.spyOn(requestFunctions, 'del').mockImplementation(async () => {
      const res = new Response(undefined, {
        status: HttpStatus.NO_CONTENT,
      });

      const data = undefined;

      return { res, data };
    });
    vi.spyOn(router, 'push').mockImplementation(async () => {});

    render(DeleteButtonVue, {
      props: {
        id: 1,
      },
      global: {
        plugins: [vuetify, router, pinia]
      }
    });

    const btn = await screen.findByText('Delete');
    await fireEvent.click(btn);

    expect(requestFunctions.del).toHaveBeenCalled();
  });
});