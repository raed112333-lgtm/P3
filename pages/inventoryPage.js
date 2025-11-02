// Inventory Page Class
export const inventoryPageTitle = "Products";

export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = ".title";
    this.shoppingCart = '[id="shopping_cart_container"]';
    this.cartBadge = '[data-test="shopping-cart-badge"]';
  }

  async addProductToCart(productName) {
    const productId = productName.toLowerCase().replace(/\s+/g, "-");
    await this.page.click(`[id="add-to-cart-${productId}"]`);
  }

  // פונקציה - הוספת מוצר לעגלה לפי ID מלא
  async addProductById(productId) {
    // productId צריך להיות כמו: "sauce-labs-bolt-t-shirt"
    await this.page.click(`[id="add-to-cart-${productId}"]`);
  }

  // פונקציה - לחיצה על מוצר לפי מספר item (מעבר לעמוד המוצר)
  async clickProductByItemNumber(itemId) {
    await this.page.click(`#item_${itemId}_title_link`);
  }

  async getCartItemCount() {
    return await this.page.locator(this.cartBadge).textContent();
  }

  async goToCart() {
    await this.page.click(this.shoppingCart);
  }
}
