
import { test, expect } from '@playwright/test';
import { StandardUser } from '../data/LoginData';

test('login form is submitted successfully', async ({ page }) => {
await page.goto('https://www.saucedemo.com/');

await page.fill('[data-test="username"]', StandardUser.username);
await page.fill('[data-test="password"]', StandardUser.password);
await page.click('[data-test="login-button"]');


  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(page.locator('.title')).toHaveText('Products');

  // הוספת מוצר ראשון
  await page.click('[id="add-to-cart-sauce-labs-bolt-t-shirt"]');
  
  // בדיקה שה-badge מציג "1"
  await expect(page.locator('.shopping_cart_badge')).toBeVisible();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  
  // הוספת מוצר שני
  await page.click('[id="add-to-cart-sauce-labs-bike-light"]');
  
  // בדיקה שה-badge מציג "2"
  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
});