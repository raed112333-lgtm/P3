// Checkout Page Class
export const checkoutStepOnePage =
  "https://www.saucedemo.com/checkout-step-one.html";
export const checkoutStepOneTitle = "Checkout: Your Information";
export const checkoutStepTwoPage =
  "https://www.saucedemo.com/checkout-step-two.html";
export const checkoutCompletePage =
  "https://www.saucedemo.com/checkout-complete.html";
export const checkoutCompleteHeader = "Thank you for your order!";

export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = ".title";
    this.firstNameInput = '[data-test="firstName"]';
    this.lastNameInput = '[data-test="lastName"]';
    this.postalCodeInput = '[data-test="postalCode"]';
    this.continueButton = '[data-test="continue"]';
    this.cancelButton = '[data-test="cancel"]';
    this.finishButton = '[data-test="finish"]';
    this.backButton = '[id="back-to-products"]';
    this.completeHeader = ".complete-header";
  }

  // מילוי פרטי משלוח
  async fillShippingInfo(firstName, lastName, postalCode) {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.postalCodeInput, postalCode);
  }

  // המשך לסיכום ההזמנה
  async continue() {
    await this.page.click(this.continueButton);
  }

  // ביטול
  async cancel() {
    await this.page.click(this.cancelButton);
  }

  // סיום הזמנה
  async finishOrder() {
    await this.page.click(this.finishButton);
  }

  // חזרה לדף המוצרים (אחרי סיום הזמנה)
  async backToProducts() {
    await this.page.click(this.backButton);
  }
}
