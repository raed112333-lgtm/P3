
import { test, expect } from '@playwright/test';
import { StandardUser } from '../data/LoginData.js';

test('login form is submitted successfully', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('[data-test="username"]', StandardUser.username);
  await page.fill('[data-test="password"]', StandardUser.password);
  await page.click('[data-test="login-button"]');

await page.click('#item_4_title_link');

await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4');
});