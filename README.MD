# Saucedemo Automation Framework

## Setup Instructions
1. Clone repo: `git clone <url>`
2. Install deps: `npm install`
3. Install browsers: `npx playwright install`

## Installation Steps
- Node.js 18+
- .env file with BASE_URL, users, passwords (see .env.example)

## Run Tests
- All tests: `npx playwright test`
- Specific file: `npx playwright test tests/login.spec.js`
- Headed: `npx playwright test --headed`
- Parallel: Enabled by default

## Generate Allure Report
1. Run tests (generates allure-results)
2. Generate: `allure generate allure-results --clean -o allure-report`
3. Open: `allure open allure-report` or `allure serve allure-results`

## Framework Structure
- `pages/`: POM classes
- `tests/`: Spec files
- `data/`: Test data (CSV for data-driven)
- `playwright.config.js`: Config
- `.env`: Secrets

## Assumptions
- Using site-provided users.
- Tests independent via fixtures.

## Design Decisions
- POM for modularity.
- Data-driven for login to cover cases efficiently.
- No hard waits; rely on Playwright auto-wait.
- Allure for steps and failure artifacts.
- Bonus: Data-driven, retries, tagging (@smoke).
