export class MainPage {
    // техническое описание страницы
    
        constructor (page) {
            this.page = page;
            this.signupLink = page.getByRole('link', { name: 'Sign up' }).describe('Кнопка//cсылка зарегистрироваться');
            this.loginLink = page.getByRole('link', { name: 'Login' }).describe('Кнопка//cсылка залогиниться');
        }
    // бизнесовые действия со страницей
    
    async gotoRegister() {
        await this.signupLink.click();
    }

    async gotoLogin() {
        await this.loginLink.click();
    }
    
    async open(url) {
        await this.page.goto(url);
    }
    }