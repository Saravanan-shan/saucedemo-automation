const { defineConfig, devices } = require('@playwright/test');
require('dotenv').config();  // For env vars

module.exports = defineConfig({
  testDir: './tests',  // Where tests live
  fullyParallel: true,  // Parallel execution
  forbidOnly: !!process.env.CI,  // No .only in CI
  retries: process.env.CI ? 2 : 0,  // Bonus: Retry in CI
  workers: process.env.CI ? 1 : undefined,  // Parallel workers
  reporter: [
    ['html'],  // Built-in HTML report
    ['allure-playwright']  // Allure integration
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com/',
    headless: false,  // Headless for CI
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'on-first-retry',  // Bonus: Videos on failure
    screenshot: 'only-on-failure',  // Screenshots on failure (for Allure)
    trace: 'on-first-retry',  // Traces on retry
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    
  ],
});