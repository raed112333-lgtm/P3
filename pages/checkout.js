export const checkoutPage = 'https://www.saucedemo.com/checkout-step-one.html';
export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.checkoutButton = '[data-test="checkout"]';
  }

  async proceedToCheckout() {
    await this.page.click(this.checkoutButton);
  }
}
