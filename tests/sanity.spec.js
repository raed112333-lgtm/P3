import { test, expect } from "@playwright/test";
import { StandardUser, shippingInfo } from "../data/LoginData";
import { product1, product2 } from "../data/productData";
import { LoginPage, inventoryPage } from "../pages/loginPage";
import { InventoryPage } from "../pages/inventoryPage";
import { CartPage, cartPage, cartTitle } from "../pages/cartPage";
import {
  CheckoutPage,
  checkoutCompletePage,
  checkoutCompleteHeader,
  checkoutStepOnePage,
  checkoutStepOneTitle,
  checkoutStepTwoPage,
} from "../pages/checkoutPage";

test("Complete purchase flow with POM", async ({ page }) => {
  // יצירת אובייקטים של כל הדפים
  const loginPageObj = new LoginPage(page);
  const inventoryPageObj = new InventoryPage(page);
  const cartPageObj = new CartPage(page);
  const checkoutPageObj = new CheckoutPage(page);

  // שלב 1: התחברות
  await loginPageObj.navigate();
  await loginPageObj.login(StandardUser.username, StandardUser.password);
  await expect(page).toHaveURL(inventoryPage);

  // שלב 2: הוספת מוצרים לעגלה
  await inventoryPageObj.addProductById(product1.id);

  // בדיקה שהמספר בעגלה = 1
  await expect(page.locator(inventoryPageObj.cartBadge)).toHaveText("1");

  await inventoryPageObj.addProductById(product2.id);

  // בדיקה שהמספר בעגלה השתנה ל-2
  await expect(page.locator(inventoryPageObj.cartBadge)).toHaveText("2");
  await expect(page.locator(inventoryPageObj.cartBadge)).toBeVisible();

  // שלב 3: מעבר לעגלה
  await inventoryPageObj.goToCart();
  await expect(page).toHaveURL(cartPage);
  await expect(page.locator(cartPageObj.pageTitle)).toHaveText(cartTitle);

  // שלב 4: בדיקת תוכן העגלה
  const itemCount = await cartPageObj.getCartItemsCount();
  expect(itemCount).toBe(2);

  // שלב 5: מעבר ל-checkout
  await cartPageObj.proceedToCheckout();
  await expect(page).toHaveURL(checkoutStepOnePage);
  await expect(page.locator(checkoutPageObj.pageTitle)).toHaveText(
    checkoutStepOneTitle
  );

  // שלב 6: מילוי פרטי משלוח
  await checkoutPageObj.fillShippingInfo(
    shippingInfo.firstName,
    shippingInfo.lastName,
    shippingInfo.postalCode
  );
  await checkoutPageObj.continue();

  // שלב 7: אישור ההזמנה
  await expect(page).toHaveURL(checkoutStepTwoPage);
  await checkoutPageObj.finishOrder();

  // שלב 8: בדיקה שההזמנה הושלמה
  await expect(page).toHaveURL(checkoutCompletePage);
  await expect(page.locator(checkoutPageObj.completeHeader)).toHaveText(
    checkoutCompleteHeader
  );
  await checkoutPageObj.backToProducts();
  await expect(page).toHaveURL(inventoryPage);
});
