
import { test, expect } from '@playwright/test';

test('login form is submitted successfully', async ({ page }) => {
await page.goto('https://www.saucedemo.com/');
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');

  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');


  await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
});
