const { test, expect } = require('@playwright/test');

test('basic test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  expect(await page.title()).toBe('Swag Labs');
});