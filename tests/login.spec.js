const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const fs = require('fs');
const { parse } = require('csv-parse/sync');  // For data-driven 


const loginData = parse(fs.readFileSync('data/loginData.csv', 'utf-8'), {
  columns: true,
  skip_empty_lines: true,
  relax_quotes: true,
  quote: '"',
  escape: '"'
});

for (const data of loginData) {
  test.describe(`Login: ${data.scenario}`, () => {
    test('should handle login', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await test.step('Navigate to login', async () => {
        await loginPage.navigate();
        expect(await loginPage.getUrl()).toContain('/');
        expect(await loginPage.getTitle()).toBe('Swag Labs');
      });

      await test.step('Attempt login', async () => {
        await loginPage.login(data.username, data.password);
      });

      if (data.expectedOutcome === 'success') {
        await test.step('Validate successful login', async () => {
          const inventoryPage = new InventoryPage(page);
          expect(await inventoryPage.getUrl()).toContain('/inventory.html');
          expect(await inventoryPage.getTitle()).toBe('Swag Labs');
      
          await expect(inventoryPage.addToCartButtons.first()).toBeVisible();
        });
      } else {
        await test.step('Validate error', async () => {
          expect(await loginPage.isErrorVisible()).toBe(true);
          expect(await loginPage.getErrorMessage()).toBe(data.errorMessage);
        });
      }
    });
  });
}