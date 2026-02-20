const BasePage = require('./BasePage');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartItems = page.locator('.cart_item');
    this.removeButtons = page.locator('[data-test^="remove-"]');
    this.productNames = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');
  }

  async getItemCount() {
    return await this.cartItems.count();
  }

  async getProductName(index = 0) {
    return await this.productNames.nth(0).textContent();
  }

  async getProductPrice(index = 0) {
    return await this.productPrices.nth(0).textContent();
  }

  async removeItem(index = 0) {
    await this.removeButtons.nth(index).click();
  }
}

module.exports = CartPage;