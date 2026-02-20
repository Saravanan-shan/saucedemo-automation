const BasePage = require('./BasePage');

class InventoryPage extends BasePage {
  constructor(page) {
    super(page);
    this.addToCartButtons = page.locator('[data-test^="add-to-cart-"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async addProductToCart(productIndex = 0) {
    await this.addToCartButtons.nth(0).click();
  }

  async getCartBadgeCount() {
    const text = await this.cartBadge.textContent();
    return text ? parseInt(text) : 0;
  }

  async goToCart() {
    await this.cartLink.click();
  }
}

module.exports = InventoryPage;