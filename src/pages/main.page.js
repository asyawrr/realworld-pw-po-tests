export class MainPage {
    constructor (page) {
        this.page = page;
        // technical description
        this.signUpLink = page.getByRole('link', {name: 'Sign Up'}).describe('Кнопка //ссылка зарегистрированна');


    }
    // business action
    async goToRegister () {
        this.signUpLink.click()
    }

    async open (url) {
        this.page.goto(url);
    }

}