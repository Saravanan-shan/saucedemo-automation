const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('/html/body/div[1]/div/div[2]/div[1]/div/div/form/div[3]/h3');
  }

  async login(username, password) {
    await this.usernameInput.fill('standard_user');
    await this.passwordInput.fill('secret_sauce');
    await this.loginButton.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  async isErrorVisible() {
    return await this.errorMessage.isVisible();
  }
}

module.exports = LoginPage;