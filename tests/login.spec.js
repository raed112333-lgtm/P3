import { test, expect } from "@playwright/test";
import {
  problemUser,
  StandardUser,
  performanceGlitchUser,
  lockedUser,
  errorMessages,
} from "../data/LoginData";
import { LoginPage, loginPage, inventoryPage } from "../pages/loginPage";
import { InventoryPage } from "../pages/inventoryPage";
import { inventoryPageTitle } from "../pages/inventoryPage";

test.describe("Login Tests", () => {
  test.beforeEach(async ({ page }) => {
    const loginPageObj = new LoginPage(page);
    await loginPageObj.navigate();
  });

  // בדיקות חיוביות - התחברות מצליחה
  test.describe("Positive Login Tests", () => {
    test("Login with standard user", async ({ page }) => {
      const loginPageObj = new LoginPage(page);
      const inventoryPageObj = new InventoryPage(page);

      await loginPageObj.login(StandardUser.username, StandardUser.password);
      await expect(page).toHaveURL(inventoryPage);
      await expect(page.locator(inventoryPageObj.pageTitle)).toHaveText(
        inventoryPageTitle
      );
    });

    test("Login with problem user", async ({ page }) => {
      const loginPageObj = new LoginPage(page);
      const inventoryPageObj = new InventoryPage(page);
      await loginPageObj.login(problemUser.username, problemUser.password);
      await expect(page).toHaveURL(inventoryPage);
      await expect(page.locator(inventoryPageObj.pageTitle)).toHaveText(
        inventoryPageTitle
      );
    });

    test("Login with performance glitch user", async ({ page }) => {
      const loginPageObj = new LoginPage(page);
      const inventoryPageObj = new InventoryPage(page);
      await loginPageObj.login(
        performanceGlitchUser.username,
        performanceGlitchUser.password
      );
      await expect(page).toHaveURL(inventoryPage);
      await expect(page.locator(inventoryPageObj.pageTitle)).toHaveText(
        inventoryPageTitle
      );
    });
  });

  // בדיקות שליליות - התחברות נכשלת
  test.describe("Negative Login Tests", () => {
    test("Login with locked out user", async ({ page }) => {
      const loginPageObj = new LoginPage(page);
      await loginPageObj.login(lockedUser.username, lockedUser.password);
      // בדיקה שנשארנו בדף ההתחברות
      await expect(page).toHaveURL(loginPage);
      // בדיקה שמופיעה הודעת שגיאה
      await expect(page.locator(loginPageObj.errorMessage)).toBeVisible();
      await expect(page.locator(loginPageObj.errorMessage)).toContainText(
        errorMessages.lockedOut
      );
    });

    test("Login with wrong password", async ({ page }) => {
      const loginPageObj = new LoginPage(page);
      await loginPageObj.login(StandardUser.username, "wrong_password");
      await expect(page).toHaveURL(loginPage);
      await expect(page.locator(loginPageObj.errorMessage)).toBeVisible();
      await expect(page.locator(loginPageObj.errorMessage)).toContainText(
        errorMessages.noMatch
      );
    });

    test("Login with wrong username", async ({ page }) => {
      const loginPageObj = new LoginPage(page);
      await loginPageObj.login("wrong_user", StandardUser.password);
      await expect(page).toHaveURL(loginPage);
      await expect(page.locator(loginPageObj.errorMessage)).toBeVisible();
      await expect(page.locator(loginPageObj.errorMessage)).toContainText(
        errorMessages.noMatch
      );
    });

    test("Login with empty username", async ({ page }) => {
      const loginPageObj = new LoginPage(page);
      await loginPageObj.login("", StandardUser.password);
      await expect(page).toHaveURL(loginPage);
      await expect(page.locator(loginPageObj.errorMessage)).toBeVisible();
      await expect(page.locator(loginPageObj.errorMessage)).toContainText(
        errorMessages.usernameRequired
      );
    });

    test("Login with empty password", async ({ page }) => {
      const loginPageObj = new LoginPage(page);
      await loginPageObj.login(StandardUser.username, "");
      await expect(page).toHaveURL(loginPage);
      await expect(page.locator(loginPageObj.errorMessage)).toBeVisible();
      await expect(page.locator(loginPageObj.errorMessage)).toContainText(
        errorMessages.passwordRequired
      );
    });

    test("Login with both fields empty", async ({ page }) => {
      const loginPageObj = new LoginPage(page);
      await loginPageObj.login("", "");
      await expect(page).toHaveURL(loginPage);
      await expect(page.locator(loginPageObj.errorMessage)).toBeVisible();
      await expect(page.locator(loginPageObj.errorMessage)).toContainText(
        errorMessages.usernameRequired
      );
    });
  });
});
