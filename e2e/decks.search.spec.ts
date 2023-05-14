import { test, expect, type Locator } from '@playwright/test';
import { api } from './util/api';
import { rejectRequest } from './util/userAuthorization';
import { deckCatalogueSeed } from './util/deck-seeds';

const client = 'http://localhost:5173';
// const searchPage = (title: string) => `${client}/decks/search?title=${title}`;
const homePage = `${client}/`;

const sessionEndpoint = api.endpoints.accounts.session;
const searchEndpoint = (title: string) => api.endpoints.decks.search(title);

test.describe('All decks page', () => {
  let searchField: Locator;
  test.beforeEach(async ({ page }) => {
    await page.route(sessionEndpoint, async (route) => {
      await route.fulfill(rejectRequest());
    });

    await page.goto(homePage);
    const menuBtn = page.getByLabel('Open menu');
    await menuBtn.waitFor();

    await menuBtn.click();

    searchField = page.getByLabel('Search decks by title').first();
    await searchField.waitFor();

    await searchField.fill('Deck');
  });

  test('Shows special message if there are no results', async ({ page }) => {
    await page.route(searchEndpoint('Deck'), async (route) => {
      await route.fulfill(deckCatalogueSeed(0, 0));
    });

    await searchField.press('Enter');
    page.getByText('Browse all decks');
    page.getByText('No decks found!');
  });

  test('Renders properly', async ({ page }) => {
    await page.route(searchEndpoint('Deck'), async (route) => {
      await route.fulfill(deckCatalogueSeed(20, 6));
    });

    await searchField.press('Enter');
    await page.getByText('Showing 6 out of 20 items').waitFor();
    await page.getByText('Search results for "Deck"').waitFor();
    
    const decks = page.getByText('Deck #');
    await decks.first().waitFor();
    const count = await decks.count();
    expect(count).toBe(6);
  });
});