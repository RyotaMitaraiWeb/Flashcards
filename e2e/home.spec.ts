import { test, expect } from '@playwright/test';
import { api } from './util/api';
import { authorizeRequest, rejectRequest } from './util/userAuthorization';
import { HttpStatus } from '../src/constants/httpstatus';
import { deckCatalogueSeed } from './util/deck-seeds';

const client = 'http://localhost:5173';
const homePage = `${client}/`;

const sessionEndpoint = api.endpoints.accounts.session;
const bookmarkEndpoint = api.endpoints.bookmarks.saved;

test.describe('Home page', () => {
  test('Displays correct text for guests', async ({ page }) => {
    await page.route(sessionEndpoint, async (route) => {
      await route.fulfill(rejectRequest());
    });

    await page.goto(homePage);
    await page.getByText('Log in or register today for extra features!').waitFor();
    await page.getByText('With an account, you can save your favorite decks and see them here! You will also be able to create your own decks! So don\'t wait and register or log into your account!').waitFor();
  });

  test('Displays properly for logged in users (they have saved decks)', async ({ page }) => {
    await page.route(sessionEndpoint, async (route) => {
      await route.fulfill(authorizeRequest());
    });

    await page.route(bookmarkEndpoint, async (route) => {
      await route.fulfill(deckCatalogueSeed(20, 6));
    });

    await page.goto(homePage);
    await page.getByText('Showing 6 out of 20 items').waitFor();
    await page.getByText('Browse your saved decks').waitFor();

    const decks = page.getByText('Deck #');
    await decks.first().waitFor();
    const count = await decks.count();
    expect(count).toBe(6);
  });

  test('Displays properly for logged in users (they do not have saved decks)', async ({ page }) => {
    await page.route(sessionEndpoint, async (route) => {
      await route.fulfill(authorizeRequest());
    });

    await page.route(bookmarkEndpoint, async (route) => {
      await route.fulfill(deckCatalogueSeed(0, 0));
    });

    await page.goto(homePage);
    await page.getByText('No decks found!').waitFor();
  });

  test('Displays properly for logged in users (server responds with a non-OK status code)', async ({ page }) => {
    await page.route(sessionEndpoint, async (route) => {
      await route.fulfill(authorizeRequest());
    });

    await page.route(bookmarkEndpoint, async (route) => {
      await route.fulfill({
        status: HttpStatus.UNAUTHORIZED,
        contentType: 'application/json',
        body: JSON.stringify({
          errors: 'Unauthorized',
          messages: ['Not logged in'],
          statusCode: HttpStatus.UNAUTHORIZED,
        })
      });
    });

    await page.goto(homePage);
    await page.getByText('An error occurred!').waitFor();
    await page.getByText('Please refresh and try again!').waitFor();
  });

  test('Displays properly for logged in users (network failure after logging in)', async ({ page }) => {
    await page.route(sessionEndpoint, async (route) => {
      await route.fulfill(authorizeRequest());
    });

    await page.route(bookmarkEndpoint, async (route) => {
      await route.abort();
    });

    await page.goto(homePage);
    await page.getByText('An error occurred!').waitFor();
    await page.getByText('Please refresh and try again!').waitFor();
  });
});
