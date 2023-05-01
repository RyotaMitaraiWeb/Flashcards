import { test, expect } from '@playwright/test';
import { api } from './util/api';
import { authorizeRequest, rejectRequest } from './util/userAuthorization';
import { HttpStatus } from '../src/constants/httpstatus';
import { validationErrorMessages } from '../src/constants/validationErrorMessages';

const client = 'http://localhost:5173';
const registerPage = `${client}/register`;
const homePage = `${client}/`

const username = 'ryota1';
const password = '123456';

const registerEndpoint = api.endpoints.accounts.register;
const sessionEndpoint = api.endpoints.accounts.session;
const usernameExistsEndpoint = api.endpoints.accounts.usernameExists(username);

test.describe('Register page', () => {
  test('Registers successfully', async ({ page }) => {
    await page.route(sessionEndpoint, async (route) => {
      await route.fulfill(rejectRequest());
    });

    await page.route(usernameExistsEndpoint, async (route) => {
      await route.fulfill({
        status: HttpStatus.NOT_FOUND,
        contentType: 'application/json',
        body: JSON.stringify({})
      });
    });

    await page.route(registerEndpoint, async (route) => {
      await route.fulfill(authorizeRequest());
    });

    await page.goto(registerPage);

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

  test('Displays validation errors and disables the Submit button', async ({ page }) => {
    await page.route(sessionEndpoint, async (route) => {
      await route.fulfill(rejectRequest());
    });

    await page.route(usernameExistsEndpoint, async (route) => {
      await route.fulfill({
        status: HttpStatus.OK,
        contentType: 'application/json',
        body: JSON.stringify({})
      });
    });

    await page.goto(registerPage);

    const submit = await page.waitForSelector('[type="submit"]');
    expect(await submit.isDisabled()).toBe(true);

    const usernameField = page.locator('[name="username"]');
    const passwordField = page.locator('[name="password"]');

    await usernameField.fill('ryota1');
    await passwordField.fill('1');

    await page.waitForSelector(`text=${validationErrorMessages.account.username.alreadyExists}`);
    await page.waitForSelector(`text=${validationErrorMessages.account.password.isTooShort}`);

    expect(await submit.isDisabled()).toBe(true);

    await page.route(usernameExistsEndpoint, async (route) => {
      await route.fulfill({
        status: HttpStatus.NOT_FOUND,
        contentType: 'application/json',
        body: JSON.stringify({})
      });
    });

    await usernameField.fill('_12345678901234567890');
    await page.waitForSelector(`text=${validationErrorMessages.account.username.isNotAlphanumeric}`);
    await page.waitForSelector(`text=${validationErrorMessages.account.username.isTooLong}`);
    expect(await submit.isDisabled()).toBe(true);

    await usernameField.fill('1');
    await page.waitForSelector(`text=${validationErrorMessages.account.username.isTooShort}`);
    expect(await submit.isDisabled()).toBe(true);
  });

  test('Disables Submit button if username exist check results in a network error', async ({ page }) => {
    await page.route(sessionEndpoint, async (route) => {
      await route.fulfill(rejectRequest());
    });

    await page.route(usernameExistsEndpoint, async (route) => {
      await route.abort();
    });

    await page.goto(registerPage);
    const usernameField = page.locator('[name="username"]');
    await usernameField.fill('ryota1');

    await page.waitForSelector('text=An error occurred, please try again later');
    const submit = await page.waitForSelector('[type="submit"]');
    expect(await submit.isDisabled()).toBe(true);
  });

  test('Access is blocked to users that are already logged in', async ({ page }) => {
    await page.route(sessionEndpoint, async (route) => {
      await route.fulfill(authorizeRequest());
    });

    await page.goto(registerPage);
    await page.waitForURL(homePage);
  });
});
