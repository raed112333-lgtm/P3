
import { test, expect } from '@playwright/test';
import { StandardUser } from '../data/LoginData';

test('login form is submitted successfully', async ({ page }) => {
await page.goto('https://www.saucedemo.com/');

await page.fill('[data-test="username"]', StandardUser.username);
await page.fill('[data-test="password"]', StandardUser.password);
await page.click('[data-test="login-button"]');


  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(page.locator('.title')).toHaveText('Products');
  await page.click('[id="shopping_cart_container"]');
  await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

});