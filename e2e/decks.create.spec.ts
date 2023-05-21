import { test } from '@playwright/test';
import { api } from './util/api';
import { authorizeRequest, rejectRequest } from './util/userAuthorization';
import { createDeckSeed } from './util/deck-seeds';
import { HttpStatus } from '../src/constants/httpstatus';
import type { IDeck } from '../src/types/components/decks';

const client = 'http://localhost:5173';
const createPage = `${client}/decks/create`
const loginPage = `${client}/login`;
const detailsPage = `${client}/decks/1`;
const sessionEndpoint = api.endpoints.accounts.session;
const createEndpoint = api.endpoints.decks.create;
const detailsEndpoint = api.endpoints.decks.id(1);

const validDeck: IDeck = {
  title: 'Deck title',
  description: 'Super long description',
  bookmarked: false,
  id: 1,
  authorId: 1,
  createdAt: '2023-05-02T15:33:39.690Z',
  updatedAt: '2023-05-02T15:33:39.690Z',
  flashcards: [
    {
      front: 'front text 1',
      back: 'back text 1'
    },
  ]
}

test.describe('Create decks page', () => {
  test.describe('Desktop', async () => {
    test('Redirects to the deck page upon creation successfully', async ({ page }) => {
      await page.route(sessionEndpoint, async (route) => {
        await route.fulfill(authorizeRequest());
      });
  
      await page.route(createEndpoint, async (route) => {
        await route.fulfill({
          contentType: 'application/json',
          status: HttpStatus.CREATED,
          body: JSON.stringify({
            id: 1,
          })
        });
      });
  
      await page.route(detailsEndpoint, async (route) => {
        await route.fulfill(createDeckSeed());
      });
  
      await page.goto(createPage);
  
      const titleField = await page.waitForSelector('[name="title"]');
      await titleField.fill(validDeck.title)
      const descriptionField = await page.waitForSelector('[name="description"]');
      await descriptionField.fill(validDeck.description);
  
      const flashcardsTab = page.getByLabel('Manage flashcards');

      await flashcardsTab.click();

      const frontSideField = page.getByLabel('Flashcard content for front side');
      const backSideField = page.getByLabel('Flashcard content for back side');

      await frontSideField.fill(validDeck.flashcards[0].front);
      await backSideField.fill(validDeck.flashcards[0].back);

      const submit = page.getByText('Create Deck');
      await submit.click();

      await page.waitForURL(detailsPage);
    });
  });

  test.describe('Mobile', async () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 600 })
    });

    test('Redirects to the deck page upon creation successfully', async ({ page }) => {
      await page.route(sessionEndpoint, async (route) => {
        await route.fulfill(authorizeRequest());
      });
  
      await page.route(createEndpoint, async (route) => {
        await route.fulfill({
          contentType: 'application/json',
          status: HttpStatus.CREATED,
          body: JSON.stringify({
            id: 1,
          })
        });
      });
  
      await page.route(detailsEndpoint, async (route) => {
        await route.fulfill(createDeckSeed());
      });
  
      await page.goto(createPage);
  
      const titleField = await page.waitForSelector('[name="title"]');
      await titleField.fill(validDeck.title)
      const descriptionField = await page.waitForSelector('[name="description"]');
      await descriptionField.fill(validDeck.description);
  
      const flashcardsTab = page.getByLabel('Manage flashcards');

      await flashcardsTab.click();

      const backSideTab = page.getByLabel('Switch to back side');

      const frontSideField = page.getByLabel('Flashcard content for front side');
      const backSideField = page.getByLabel('Flashcard content for back side');

      await frontSideField.fill(validDeck.flashcards[0].front);

      await backSideTab.click();

      await backSideField.fill(validDeck.flashcards[0].back);

      const submit = page.getByText('Create Deck');
      await submit.click();

      await page.waitForURL(detailsPage);
    });
  });

  test('Cannot be accessed by guests', async ({ page }) => {
    await page.route(sessionEndpoint, async (route) => {
      await route.fulfill(rejectRequest());
    });

    await page.goto(createPage);
    await page.waitForURL(loginPage);
  });
});