export class LoginPage {
  // техническое описание страницы

  constructor(page) {
    this.page = page;

    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
  }
  // бизнесовые действия со страницей

  async login(email, password) {
    await this.emailInput.click();
    await this.emailInput.fill(email);

    await this.passwordInput.click();
    await this.passwordInput.fill(password);

    await this.loginButton.click();
  }
}
