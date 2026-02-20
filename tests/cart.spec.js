const { test, expect } = require('@playwright/test');

const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const CartPage = require('../pages/CartPage');

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD);
  expect(await page.url()).toContain('/inventory.html');
});

test('Add and remove products from cart', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await test.step('Add products to cart', async () => {
    await inventoryPage.addProductToCart(0);  // First product
    await inventoryPage.addProductToCart(1);  // Second
    expect(await inventoryPage.getCartBadgeCount()).toBe(2);
  });

  await test.step('Navigate to cart and validate', async () => {
    await inventoryPage.goToCart();
    expect(await cartPage.getUrl()).toContain('/cart.html');
    expect(await cartPage.getItemCount()).toBe(2);

    
    expect(await cartPage.getProductName(0)).toBe('Sauce Labs Backpack');
    expect(await cartPage.getProductPrice(0)).toBe('$29.99');
  });

  await test.step('Remove product and verify', async () => {
    await cartPage.removeItem(0);
    expect(await cartPage.getItemCount()).toBe(1);
    
  });
});

