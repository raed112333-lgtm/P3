// Cart Page Class
export const cartPage = "https://www.saucedemo.com/cart.html";
export const cartTitle = "Your Cart";

export class CartPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = ".title";
    this.cartItems = ".cart_item";
    this.checkoutButton = '[data-test="checkout"]';
    this.continueShoppingButton = '[data-test="continue-shopping"]';
    this.cartItemName = ".inventory_item_name";
    this.cartItemPrice = ".inventory_item_price";
  }

  async getFirstCartItem() {
    return this.page.locator(this.cartItems).first();
  }

  // ספירת מספר הפריטים בעגלה
  async getCartItemsCount() {
    return await this.page.locator(this.cartItems).count();
  }

  // קבלת שמות כל המוצרים בעגלה
  async getAllProductNames() {
    return await this.page.locator(this.cartItemName).allTextContents();
  }

  // הסרת מוצר לפי ID
  async removeProductById(productId) {
    await this.page.click(`[id="remove-${productId}"]`);
  }

  // מעבר לתהליך checkout
  async proceedToCheckout() {
    await this.page.click(this.checkoutButton);
  }

  // המשך קניות (חזרה לדף המוצרים)
  async continueShopping() {
    await this.page.click(this.continueShoppingButton);
  }
}
