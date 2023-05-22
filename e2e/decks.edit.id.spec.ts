import { test } from '@playwright/test';
import { api } from './util/api';
import { authorizeRequest, rejectRequest } from './util/userAuthorization';
import { createDeckSeed, deckCatalogueSeed, deckSeed } from './util/deck-seeds';
import { HttpStatus } from '../src/constants/httpstatus';

const client = 'http://localhost:5173';
const editPage = `${client}/decks/1/edit`;
const loginPage = `${client}/login`;
const detailsPage = `${client}/decks/1`;
const sessionEndpoint = api.endpoints.accounts.session;
const editEndpoint = api.endpoints.decks.edit(1);
const detailsEndpoint = api.endpoints.decks.id(1);
const homePage = `${client}/`;

test.describe.only('Edit deck page', () => {
  test.describe('Desktop', async () => {
    test('Redirects to the deck page upon edit successfully', async ({ page }) => {
      await page.route(sessionEndpoint, async (route) => {
        await route.fulfill(authorizeRequest());
      });
  
      await page.route(editEndpoint, async (route) => {
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
  
      await page.goto(editPage);
  
      const titleField = await page.waitForSelector('[name="title"]');
      await titleField.fill('new title')
      const descriptionField = await page.waitForSelector('[name="description"]');
      await descriptionField.fill('new description');
  
      const flashcardsTab = page.getByLabel('Manage flashcards');

      await flashcardsTab.click();

      const frontSideField = page.getByLabel('Flashcard content for front side');
      const backSideField = page.getByLabel('Flashcard content for back side');

      await frontSideField.fill('new content for front');
      await backSideField.fill('new content for back');

      const submit = page.getByText('Edit Deck');
      await submit.click();

      await page.waitForURL(detailsPage);
    });
  });

  test.describe('Mobile', async () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 600 })
    });

    test('Redirects to the deck page upon edit successfully', async ({ page }) => {
      await page.route(sessionEndpoint, async (route) => {
        await route.fulfill(authorizeRequest());
      });
  
      await page.route(editEndpoint, async (route) => {
        await route.fulfill({
          contentType: 'application/json',
          status: HttpStatus.NO_CONTENT,
        });
      });
  
      await page.route(detailsEndpoint, async (route) => {
        await route.fulfill(deckSeed(1));
      });
  
      await page.goto(editPage);
  
      const titleField = await page.waitForSelector('[name="title"]');
      await titleField.fill('new title')
      const descriptionField = await page.waitForSelector('[name="description"]');
      await descriptionField.fill('new description');
  
      const flashcardsTab = page.getByLabel('Manage flashcards');

      await flashcardsTab.click();

      const backSideTab = page.getByLabel('Switch to back side');

      const frontSideField = page.getByLabel('Flashcard content for front side');
      const backSideField = page.getByLabel('Flashcard content for back side');

      await frontSideField.fill('new content for front');

      await backSideTab.click();

      await backSideField.fill('new content for back');

      const submit = page.getByText('Edit Deck');
      await submit.click();

      await page.waitForURL(detailsPage);
    });
  });

  test('Cannot be accessed by guests', async ({ page }) => {
    await page.route(sessionEndpoint, async (route) => {
      await route.fulfill(rejectRequest());
    });

    await page.goto(editPage);
    await page.waitForURL(loginPage);
  });

  test('Cannot be accessed by non-creators', async ({ page }) => {
    await page.route(sessionEndpoint, async (route) => {
      await route.fulfill(authorizeRequest());
    });

    await page.route(api.endpoints.bookmarks.saved, async (route) => {
      await route.fulfill(deckCatalogueSeed(12, 6));
    });

    await page.route(detailsEndpoint, async (route) => {
      await route.fulfill(deckSeed(100));
    });

    await page.goto(editPage);
    await page.waitForURL(homePage);
  });

  test('Redirects to not found if the deck does not exist', async ({ page }) => {
    await page.route(sessionEndpoint, async (route) => {
      await route.fulfill(authorizeRequest());
    });

    await page.route(detailsEndpoint, async (route) => {
      await route.fulfill({
        contentType: 'application/json',
        status: HttpStatus.NOT_FOUND,
        body: JSON.stringify({
          message: ['Deck does not exist'],
          error: 'Not Found',
          statusCode: HttpStatus.NOT_FOUND,
        }),
      });
    });

    await page.goto(editPage);

    await page.waitForURL(`${client}/page-not-found`);
  });
});