import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/vue';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { createTestingPinia } from '@pinia/testing';
import { useLoadingStore } from '../../stores/loading/loading';
import Submit from './Submit.vue';

const vuetify = createVuetify({
  components,
  directives,
});

describe('Submit component', () => {
  it('Renders correctly', () => {
    const pinia = createTestingPinia();

    const { container } = render(Submit, {
      global: {
        plugins: [vuetify, pinia],
      },
      slots: {
        default: 'Login',
      },
      props: {
        icon: 'mdi-login-variant',
      },
    });

    screen.findByText('Login');
    const button = container.querySelector('.submit-btn') as HTMLButtonElement;

    expect(button.disabled).toBe(false);

    const icon = container.querySelector('.mdi-login-variant');
    expect(icon).not.toBeNull();
  });

  it('Button is disabled when the global loading state has status true', () => {
    const pinia = createTestingPinia({
      stubActions: false,
    });

    const store = useLoadingStore();
    store.startLoading();

    const { container } = render(Submit, {
      global: {
        plugins: [vuetify, pinia],
      },
      slots: {
        default: 'Login',
      },
      props: {
        icon: 'mdi-login-variant',
        color: 'indigo',
      },
    });

    const button = container.querySelector('.submit-btn') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

  it('Button is disabled when explicitly passed this state', () => {
    const pinia = createTestingPinia({
      stubActions: false,
    });

    const store = useLoadingStore();

    const { container } = render(Submit, {
      global: {
        plugins: [vuetify, pinia],
      },
      slots: {
        default: 'Login',
      },
      props: {
        icon: 'mdi-login-variant',
        disabled: true,
      },
    });

    const button = container.querySelector('.submit-btn') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });
});
