import { test, expect } from '@playwright/test';
import { api } from './util/api';
import { rejectRequest } from './util/userAuthorization';
import { deckCatalogueSeed } from './util/deck-seeds';

const client = 'http://localhost:5173';
const allPage = `${client}/decks/all`;

const sessionEndpoint = api.endpoints.accounts.session;
const allEndpoint = api.endpoints.decks.all;

test.describe('All decks page', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(sessionEndpoint, async (route) => {
      await route.fulfill(rejectRequest());
    });
  });

  test('Shows special message if there are no results', async ({ page }) => {
    await page.route(allEndpoint, async (route) => {
      await route.fulfill(deckCatalogueSeed(0, 0));
    });

    await page.goto(allPage);
    page.getByText('Browse all decks');
    page.getByText('No decks found!');
  });

  test('Renders properly', async ({ page }) => {
    await page.route(allEndpoint, async (route) => {
      await route.fulfill(deckCatalogueSeed(20, 6));
    });

    await page.goto(allPage);
    page.getByText('Showing 6 out of 20 items');
    
    await page.getByText('Deck #').first().waitFor();
    const decks = await page.getByText('Deck #').count();
    expect(decks).toBe(6);
  });
});