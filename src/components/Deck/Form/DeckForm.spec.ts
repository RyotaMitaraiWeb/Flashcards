import { expect, describe, it, vi, beforeEach } from 'vitest';
import DeckFormVue from './DeckForm.vue';
import { fireEvent, render, screen } from '@testing-library/vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import type { IFlashcard } from '../../../types/components/decks';
import { createTestingPinia } from '@pinia/testing';
import { createRouter, createWebHistory } from 'vue-router';
import HomeVue from '../../../views/Home.vue';
import * as requestFunctions from '../../../util/request/request';

const vuetify = createVuetify({
  components,
  directives,
});

const router = createRouter({
  history: createWebHistory(),
  routes: [{
    path: '/',
    component: HomeVue,
  }]
})

function deckSeed(n: number = 1, text = '') {
  const flashcards: IFlashcard[] = [];

  for (let i = 0; i < n; i++) {
    flashcards[i] = {
      front: text,
      back: text,
    }
  }

  return flashcards;
}

describe('DeckForm component', () => {
  // prevent ResizeObserver not defined error, this isn't testing any resizing
  beforeEach(() => {
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

  describe('Prop passing', () => {
    it('Renders correct heading and submit button if context prop is create', async () => {
      const pinia = createTestingPinia({
        stubActions: false,
      });

      render(DeckFormVue, {
        props: {
          context: 'create'
        },
        global: {
          plugins: [vuetify, pinia, router]
        }
      });

      await screen.findByText('Create a new deck!');
      await screen.findByText('Create Deck');
    });

    it('Renders correct heading and submit button if context prop is edit (and deck is provided)', async () => {
      const pinia = createTestingPinia({
        stubActions: false,
      });

      render(DeckFormVue, {
        props: {
          context: 'edit',
          deck: {
            title: 'some deck title',
            description: 'some description',
            flashcards: deckSeed(2, 'flashcard test'),
            id: 1,
          }
        },
        global: {
          plugins: [vuetify, pinia, router]
        }
      });

      await screen.findByText('Edit some deck title!');
      await screen.findByText('Edit Deck');

      const titleField = await screen.findByLabelText('Title');
      expect((titleField as HTMLInputElement).value).toBe('some deck title');

      const descriptionField = await screen.findByLabelText('Description');
      expect((descriptionField as HTMLInputElement).value).toBe('some description');

      const tab = await screen.findByLabelText('Manage flashcards');
      await fireEvent.click(tab);

      const flashcards = Array.from(document.querySelectorAll('textarea'))
        .map(t => t.value)
        .filter(v => v === 'flashcard test');

      expect(flashcards.length).toBe(2);
      await screen.findByText('1 / 2');
    });
  });

  describe('Tabs', () => {
    it('Switches between tabs successfully', async () => {
      const pinia = createTestingPinia({
        stubActions: false,
      });

      render(DeckFormVue, {
        props: {
          context: 'create'
        },
        global: {
          plugins: [vuetify, pinia, router]
        }
      });

      const basicTab = await screen.findByLabelText('Manage title and description');
      const flashcardsTab = await screen.findByLabelText('Manage flashcards');

      await fireEvent.click(flashcardsTab);

      await screen.findByText('Front side');

      await fireEvent.click(basicTab);
      await screen.findByText('Create a new deck!');
    });

    it('Maintains the input values during switch', async () => {
      const pinia = createTestingPinia({
        stubActions: false,
      });

      render(DeckFormVue, {
        props: {
          context: 'create'
        },
        global: {
          plugins: [vuetify, pinia, router]
        }
      });

      const basicTab = await screen.findByLabelText('Manage title and description');
      const flashcardsTab = await screen.findByLabelText('Manage flashcards');

      await fireEvent.click(flashcardsTab);

      const textarea = document.querySelector('textarea');

      await fireEvent.update(textarea as HTMLElement, 'test');

      await fireEvent.click(basicTab);
      await fireEvent.click(flashcardsTab);

      expect(textarea?.value).toBe('test');
    });
  });

  describe('Submission', () => {
    const pinia = createTestingPinia({
      stubActions: false,
    });

    it('Does not make requests and switches to basic tab if one of the fields there is invalid', async () => {
      vi.spyOn(requestFunctions, 'post').mockImplementation(async () => { 
        return { res: new Response(), data: undefined}
      });

      vi.spyOn(requestFunctions, 'put').mockImplementation(async () => { 
        return { res: new Response(), data: undefined}
      });

      render(DeckFormVue, {
        props: {
          context: 'create'
        },
        global: {
          plugins: [vuetify, pinia, router]
        }
      });

      const flashcardsTab = await screen.findByLabelText('Manage flashcards');

      await fireEvent.click(flashcardsTab);
      const frontSide = await screen.findByLabelText('Flashcard content for front side');
      const backSide = await screen.findByLabelText('Flashcard content for back side');

      await fireEvent.update(frontSide, 'test');
      await fireEvent.update(backSide, 'test');

      const submit = await screen.findByText('Create Deck');
      await fireEvent.click(submit);

      expect(requestFunctions.put).not.toHaveBeenCalled();
      expect(requestFunctions.put).not.toHaveBeenCalled();

      await screen.findByText('Create a new deck!');
    });

    it('Does not make requests and switches to flashcards tab if one of the fields there is invalid', async () => {
      vi.spyOn(requestFunctions, 'post').mockImplementation(async () => { 
        return { res: new Response(), data: undefined}
      });

      vi.spyOn(requestFunctions, 'put').mockImplementation(async () => { 
        return { res: new Response(), data: undefined}
      });

      render(DeckFormVue, {
        props: {
          context: 'create'
        },
        global: {
          plugins: [vuetify, pinia, router]
        }
      });

      const titleField = await screen.findByLabelText('Title');
      await fireEvent.update(titleField, 'some title');
    
      const descriptionField = await screen.findByLabelText('Description');
      await fireEvent.update(descriptionField, 'some description');

      const submit = await screen.findByText('Create Deck');
      await fireEvent.click(submit);

      expect(requestFunctions.put).not.toHaveBeenCalled();
      expect(requestFunctions.put).not.toHaveBeenCalled();

      await screen.findByText('Front side');
    });

    it('Prioritizes the basic data section if both sections have validation errors', async () => {
      render(DeckFormVue, {
        props: {
          context: 'create'
        },
        global: {
          plugins: [vuetify, pinia, router]
        }
      });

      const submit = await screen.findByText('Create Deck');
      await fireEvent.click(submit);

      await screen.findByText('Create a new deck!');
    });

    it('Makes a request to correct endpoint when context is create', async () => {
      vi.spyOn(requestFunctions, 'post').mockImplementation(async () => { 
        return { res: new Response(), data: undefined}
      });

      vi.spyOn(requestFunctions, 'put').mockImplementation(async () => { 
        return { res: new Response(), data: undefined}
      });

      vi.spyOn(router, 'push').mockImplementation(async () => {});

      render(DeckFormVue, {
        props: {
          context: 'create'
        },
        global: {
          plugins: [vuetify, pinia, router]
        }
      });

      const flashcardsTab = await screen.findByLabelText('Manage flashcards');

      const titleField = await screen.findByLabelText('Title');
      await fireEvent.update(titleField, 'some title');
    
      const descriptionField = await screen.findByLabelText('Description');
      await fireEvent.update(descriptionField, 'some description');

      await fireEvent.click(flashcardsTab);

      const frontSide = await screen.findByLabelText('Flashcard content for front side');
      const backSide = await screen.findByLabelText('Flashcard content for back side');

      await fireEvent.update(frontSide, 'test');
      await fireEvent.update(backSide, 'test');

      const submit = await screen.findByText('Create Deck');
      await fireEvent.click(submit);

      expect(requestFunctions.post).toHaveBeenCalled();
    });

    it('Makes a request to correct endpoint when context is edit', async () => {
      vi.spyOn(requestFunctions, 'post').mockImplementation(async () => { 
        return { res: new Response(), data: undefined}
      });

      vi.spyOn(requestFunctions, 'put').mockImplementation(async () => { 
        return { res: new Response(), data: undefined}
      });

      vi.spyOn(router, 'push').mockImplementation(async () => {});

      render(DeckFormVue, {
        props: {
          context: 'edit',
          deck: {
            title: 'some valid title',
            description: '',
            flashcards: deckSeed(2, 'test flashcard'),
          }
        },
        global: {
          plugins: [vuetify, pinia, router]
        }
      });

      const submit = await screen.findByText('Edit Deck');
      await fireEvent.click(submit);

      expect(requestFunctions.put).toHaveBeenCalled();
    });
  });
});