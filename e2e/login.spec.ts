import { test, expect } from '@playwright/test';
import { api } from './util/api';
import { authorizeRequest, rejectRequest } from './util/userAuthorization';
import { HttpStatus } from '../src/constants/httpstatus';
import { validationErrorMessages } from '../src/constants/validationErrorMessages';

const client = 'http://localhost:5173';
const loginPage = `${client}/login`;
const homePage = `${client}/`

const username = 'ryota1';
const password = '123456';

const loginEndpoint = api.endpoints.accounts.login;
const sessionEndpoint = api.endpoints.accounts.session;
const usernameExistsEndpoint = api.endpoints.accounts.usernameExists(username);

test.describe('Login page', () => {
  test('Logs in successfully', async ({ page }) => {
    await page.route(sessionEndpoint, async (route) => {
      await route.fulfill(rejectRequest());
    });

    await page.route(loginEndpoint, async (route) => {
      await route.fulfill(authorizeRequest());
    });

    await page.goto(loginPage);

    const usernameField = page.locator('[name="username"]');
    const passwordField = page.locator('[name="password"]');

    await usernameField.fill(username);
    await passwordField.fill(password);

    const submit = page.locator('[type="submit"]');
    await submit.click();

    await page.waitForURL(homePage);

    const title = await page.title();
    expect(title.includes('Home')).toBe(true);
  });

  test('Does not redirect if login fails', async ({ page }) => {
    await page.route(sessionEndpoint, async (route) => {
      await route.fulfill(rejectRequest());
    });

    await page.route(loginEndpoint, async (route) => {
      await route.fulfill({
        status: HttpStatus.UNAUTHORIZED,
        contentType: 'application/json',
        body: JSON.stringify({
          error: 'a',
          message: ['a'],
          statusCode: HttpStatus.UNAUTHORIZED,
        })
      });
    });

    await page.goto(loginPage);

    const submit = await page.waitForSelector('[type="submit"]');

    const usernameField = page.locator('[name="username"]');
    const passwordField = page.locator('[name="password"]');

    await usernameField.fill('ryota1');
    await passwordField.fill('1');

    await submit.click();
    await page.waitForURL(loginPage);

    const title = await page.title();
    expect(title.includes('Login')).toBe(true);
  });

  test('Access is blocked to users that are already logged in', async ({ page }) => {
    await page.route(sessionEndpoint, async (route) => {
      await route.fulfill(authorizeRequest());
    });

    await page.goto(loginPage);
    await page.waitForURL(homePage);
  });
});
