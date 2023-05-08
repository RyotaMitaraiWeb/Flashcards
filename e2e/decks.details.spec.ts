import { test, expect } from '@playwright/test';
import { api } from './util/api';
import { rejectRequest } from './util/userAuthorization';
import { HttpStatus } from '../src/constants/httpstatus';
import { deckSeed } from './util/deck-seeds';

const client = 'http://localhost:5173';
const homePage = `${client}/`;
const notFoundPage = `${client}/page-not-found`;
const detailsPage = `${client}/decks/1`;
const sessionEndpoint = api.endpoints.accounts.session;
const detailsEndpoint = api.endpoints.decks.id(1);

test.describe('Deck details page', () => {
  test('Performs a studying session successfully', async ({ page }) => {
    await page.route(sessionEndpoint, async (route) => {
      await route.fulfill(rejectRequest());
    });

    await page.route(detailsEndpoint, async (route) => {
      await route.fulfill(deckSeed());
    });

    await page.goto(detailsPage);
    const startButton = page.getByText('Start studying');
    await startButton.click();

    const rightArrow = page.getByLabel('Move to next flashcard');

    page.getByText('front text 1');
    page.getByText('back text 1');

    await rightArrow.click();

    page.getByText('front text 2');
    page.getByText('back text 2');

    await rightArrow.click();

    page.getByText('front text 3');
    page.getByText('back text 3');
  });

  test('Arrow buttons are displayed in correct circumstances', async ({ page }) => {
    await page.route(sessionEndpoint, async (route) => {
      await route.fulfill(rejectRequest());
    });

    await page.route(detailsEndpoint, async (route) => {
      await route.fulfill(deckSeed());
    });

    await page.goto(detailsPage);
    const startButton = page.getByText('Start studying');
    await startButton.click();

    const rightArrow = page.getByLabel('Move to next flashcard');
    const leftArrow = page.getByLabel('Move to previous flashcard');

    expect(await leftArrow.isVisible()).toBe(false);

    await rightArrow.click();
    expect(await leftArrow.isVisible()).toBe(true);
    expect(await rightArrow.isVisible()).toBe(true);

    await rightArrow.click();

    expect(await leftArrow.isVisible()).toBe(true);
    expect(await rightArrow.isVisible()).toBe(false);

    await leftArrow.click();
    expect(await leftArrow.isVisible()).toBe(true);
    expect(await rightArrow.isVisible()).toBe(true);
  });

  test('Redirects to 404 if deck does not exist', async ({ page }) => {
    await page.route(sessionEndpoint, async (route) => {
      await route.fulfill(rejectRequest());
    });

    await page.route(detailsEndpoint, async (route) => {
      await route.fulfill({
        status: HttpStatus.NOT_FOUND,
        body: JSON.stringify({
          statusCode: HttpStatus.NOT_FOUND,
          error: 'Not Found',
          message: 'Deck does not exist',
        }),
        contentType: 'application/json',
      });
    });

    await page.goto(detailsPage);
    await page.waitForURL(notFoundPage);
  });

  test('Redirects to home page for a network failure', async ({ page }) => {
    await page.route(sessionEndpoint, async (route) => {
      await route.fulfill(rejectRequest());
    });

    await page.route(detailsEndpoint, async (route) => {
      await route.abort();
    });

    await page.goto(detailsPage);
    await page.waitForURL(homePage);
  });
});