import {  describe, expect, it } from 'vitest';
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
        modelValue: false,
      }
    });

    const input = container.querySelector('input') as HTMLInputElement;
    await fireEvent.update(input, 'a');

    screen.findByText('error message');
    screen.findByText('invalid async rule');
  });
});