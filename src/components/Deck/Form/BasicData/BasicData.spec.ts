import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/vue';
import BasicDataVue from './BasicData.vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { validationErrorMessages } from '../../../../constants/validationErrorMessages';
import { validationRules } from '../../../../constants/validationRules';

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

  it('Renders and behaves correctly (no props passed)', async () => {
    render(BasicDataVue, {
      global: {
        plugins: [vuetify],
      },
    });

    const titleField = await screen.findByLabelText('Title');
    expect((titleField as HTMLInputElement).value).toBe('');
    await fireEvent.update(titleField, 'some title');

    const value = (document.querySelector('[name="title"]') as HTMLInputElement).value;
    expect(value).toBe('some title');

    const descriptionField = await screen.findByLabelText('Description');
    expect((descriptionField as HTMLInputElement).value).toBe('');
    await fireEvent.update(descriptionField, 'some description');

    const value2 = (document.querySelector('[name="description"]') as HTMLInputElement).value;
    expect(value2).toBe('some description');
  });

  it('Renders and behaves correctly (props passed)', async () => {
    render(BasicDataVue, {
      global: {
        plugins: [vuetify],
      },
      props: {
        title: 'initial title',
        description: 'initial description',
      },
    });

    const titleField = await screen.findByLabelText('Title');
    expect((titleField as HTMLInputElement).value).toBe('initial title');
    await fireEvent.update(titleField, 'some title');

    const value = (document.querySelector('[name="title"]') as HTMLInputElement).value;
    expect(value).toBe('some title');

    const descriptionField = await screen.findByLabelText('Description');
    expect((descriptionField as HTMLInputElement).value).toBe('initial description');
    await fireEvent.update(descriptionField, 'some description');

    const value2 = (document.querySelector('[name="description"]') as HTMLInputElement).value;
    expect(value2).toBe('some description');
  });

  it('Displays validation errors successfully', async () => {
    render(BasicDataVue, {
      global: {
        plugins: [vuetify],
      },
    });

    const titleField = await screen.findByLabelText('Title');
    await fireEvent.update(titleField, 's');

    await screen.findByText(validationErrorMessages.deck.title.isTooShort);
    await fireEvent.update(titleField, 'a'.repeat(validationRules.deck.title.maxLength + 1));

    await screen.findByText(validationErrorMessages.deck.title.isTooLong);

    const descriptionField = await screen.findByLabelText('Description');
    await fireEvent.update(
      descriptionField,
      'a'.repeat(validationRules.deck.description.maxLength + 1)
    );

    await screen.findByText(validationErrorMessages.deck.description.isTooLong);
  });
});
