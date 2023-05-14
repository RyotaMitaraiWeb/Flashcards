import { test, expect, type Locator } from '@playwright/test';
import { api } from './util/api';
import { authorizeRequest, rejectRequest } from './util/userAuthorization';
import { deckCatalogueSeed } from './util/deck-seeds';

const client = 'http://localhost:5173';
const homePage = `${client}/`;
const loginPage = `${client}/login`;
const ownPage = `${client}/decks/own`;
const sessionEndpoint = api.endpoints.accounts.session;
const ownEndpoint = api.endpoints.decks.own;

test.describe('All decks page', () => {
  test('Shows special message if there are no results', async ({ page }) => {
    await page.route(sessionEndpoint, async (route) => {
      await route.fulfill(authorizeRequest());
    });

    await page.route(ownEndpoint, async (route) => {
      await route.fulfill(deckCatalogueSeed(0, 0));
    });

    await page.goto(ownPage);

    await page.getByText('Browse your decks').waitFor();
    await page.getByText('No decks found!').waitFor();
  });

  test('Renders properly', async ({ page }) => {
    await page.route(sessionEndpoint, async (route) => {
      await route.fulfill(authorizeRequest());
    });

    await page.route(ownEndpoint, async (route) => {
      await route.fulfill(deckCatalogueSeed(20, 6));
    });

    await page.goto(ownPage);


    await page.getByText('Showing 6 out of 20 items').waitFor();

    const decks = page.getByText('Deck #');
    await decks.first().waitFor();
    const count = await decks.count();
    expect(count).toBe(6);
  });

  test('Redirects the user to the login page if not logged in', async ({ page }) => {
    await page.route(sessionEndpoint, async (route) => {
      await route.fulfill(rejectRequest());
    });

    await page.goto(ownPage);

    await page.waitForURL(loginPage)
  });
});