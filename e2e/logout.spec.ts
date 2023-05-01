import { test, expect } from '@playwright/test';
import { api } from './util/api';
import { authorizeRequest, rejectRequest } from './util/userAuthorization';
import { HttpStatus } from '../src/constants/httpstatus';
import { validationErrorMessages } from '../src/constants/validationErrorMessages';

const client = 'http://localhost:5173';
const logoutPage = `${client}/logout`;
const homePage = `${client}/`;
const loginPage = `${client}/login`;

const logoutEndpoint = api.endpoints.accounts.logout;
const sessionEndpoint = api.endpoints.accounts.session;

test.describe('Logout page', () => {
  test('Redirects to login if the user is not logged in', async ({ page }) => {
    await page.route(sessionEndpoint, async (route) => {
      await route.fulfill(rejectRequest());
    });

    await page.goto(logoutPage);
    await page.waitForURL(loginPage);

    const title = await page.title();
    expect(title.includes('Login')).toBe(true);
  });

  test('Logs out successfully', async ({ page }) => {
    await page.route(sessionEndpoint, async (route) => {
      await route.fulfill(authorizeRequest());
    });

    await page.route(logoutEndpoint, async (route) => {
      await route.fulfill({
        status: HttpStatus.NO_CONTENT,
        body: JSON.stringify({}),
        contentType: 'application/json',
      })
    });

    await page.goto(homePage);

    await page.waitForSelector('text=Logout');

    await page.goto(logoutPage);
    await page.waitForURL(homePage);
    await page.waitForSelector('text=Register');
    
  });

  test('Redirects to home page for a network failure', async ({ page }) => {
    await page.route(sessionEndpoint, async (route) => {
      await route.fulfill(authorizeRequest());
    });

    await page.route(logoutEndpoint, async (route) => {
      await route.abort();
    });

    await page.goto(logoutPage);
    await page.waitForURL(homePage);
  });
});
