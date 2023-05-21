import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import FlashcardInputVue from './FlashcardInputTestWrapper.vue';

const vuetify = createVuetify({
  components,
  directives,
});

describe('FlashcardInput component', () => {
  it('Renders correctly for front side', async () => {
    render(FlashcardInputVue, {
      global: {
        plugins: [vuetify]
      },
      props: {
        content: '',
        side: 'front',
      },
    });

    await screen.findByText('Front side');
  });

  it('Renders correctly for back side', async () => {
    render(FlashcardInputVue, {
      global: {
        plugins: [vuetify]
      },
      props: {
        content: '',
        side: 'back',
      },
    });

    await screen.findByText('Back side');
  });

  it('Works correctly when inputting', async () => {
    render(FlashcardInputVue, {
      global: {
        plugins: [vuetify]
      },
      props: {
        content: '',
        side: 'front',
      },
    });

    const textarea = await screen.findByLabelText('Flashcard content for front side');
    const errorText = await screen.findByText('Please fill this side!');
    expect(errorText.style.display).not.toBe('none');
    await screen.findByText('0 / 150');

    await fireEvent.update(textarea, 'hello');
    expect((textarea as HTMLTextAreaElement).value).toBe('hello');
    await screen.findByText('5 / 150');

    expect(errorText.style.display).toBe('none');
  });

  it('Focuses to textarea when handle and outer area of the "card" are clicked', async () => {
    const { container } = render(FlashcardInputVue, {
      global: {
        plugins: [vuetify]
      },
      props: {
        content: '',
        side: 'front',
      },
    });

    const handle = container.querySelector('.flashcard-head');
    const textarea = await screen.findByLabelText('Flashcard content for front side');

    await fireEvent.click(handle as Element);

    expect(document.activeElement).toEqual(textarea);

    textarea.blur();

    const outerArea = document.querySelector('.flashcard-textarea');
    await fireEvent.click(outerArea as Element);

    expect(document.activeElement).toEqual(textarea);
  });
});