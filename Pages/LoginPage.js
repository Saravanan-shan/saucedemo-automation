const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async login(username, password) {
 await this.usernameInput.fill(username);
  await this.passwordInput.fill(password);
  await this.loginButton.click();
  }

  async getErrorMessage() {
  await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
  return await this.errorMessage.textContent();
}

  async isErrorVisible() {
    return await this.errorMessage.isVisible();
  }
}

module.exports = LoginPage;