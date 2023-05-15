import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/vue';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import Field from './Field.vue';

const vuetify = createVuetify({
  components,
  directives,
});

describe('Field component', () => {
  beforeEach(() => {
    // prevent ResizeObserver not defined error, this isn't testing any resizing
  
      global.ResizeObserver = class ResizeObserver {
        observe() {
          // do nothing
        }
        unobserve() {
          // do nothing
        }
        disconnect() {
          // do nothing
        }
      };
  });
  
  it('Renders correctly (no max value counter displayed)', async () => {
    const { container, emitted } = render(Field, {
      global: {
        plugins: [vuetify],
      },
      props: {
        label: 'Some label',
        name: 'username',
        hint: 'some hint',
        type: 'text',
      }
    });

    screen.findAllByText('Some label');
    screen.findByText('some hint');

    const field = container.querySelector('input') as HTMLInputElement;
    expect(field.type).toBe('text');

    await fireEvent.update(field, 'some text');
    expect(field.value).toBe('some text');

    screen.findByText('some text'.length);
  });

  it('Renders correctly (max value counter displayed)', async () => {
    const { container, emitted } = render(Field, {
      global: {
        plugins: [vuetify],
      },
      props: {
        label: 'Some label',
        name: 'username',
        hint: 'some hint',
        type: 'text',
        counter: 15,
        displayMaxCounter: true,
      }
    });

    screen.findByText('0 / 15');
  });

  it('Renders correctly (standard input field)', async () => {
    render(Field, {
      global: {
        plugins: [vuetify],
      },
      props: {
        label: 'Some label',
        name: 'username',
        hint: 'some hint',
        type: 'text',
        counter: 15,
        displayMaxCounter: true,
      }
    });

    const field = document.querySelector('input');
    expect(field).not.toBeNull();
  });

  it('Renders correctly (textarea)', async () => {
    render(Field, {
      global: {
        plugins: [vuetify],
      },
      props: {
        label: 'Some label',
        name: 'username',
        hint: 'some hint',
        type: 'text',
        counter: 15,
        displayMaxCounter: true,
        textarea: true,
      }
    });

    const textarea = document.querySelector('textarea');
    expect(textarea).not.toBeNull();
  });

  it('Validates successfully', async () => {
    function invalid(value: string = 'a') {
      return 'error message';
    }

    async function invalidAsync(value: string = 'a') {
      return 'invalid async rule';
    }

    const { container, emitted } = render(Field, {
      global: {
        plugins: [vuetify],
      },
      props: {
        label: 'Some label',
        name: 'username',
        hint: 'some hint',
        type: 'text',
        counter: 15,
        displayMaxCounter: true,
        rules: [invalid, invalidAsync],
        modelValue: '',
      }
    });

    const input = container.querySelector('input') as HTMLInputElement;
    await fireEvent.update(input, 'a');

    screen.findByText('error message');
    screen.findByText('invalid async rule');
  });
});