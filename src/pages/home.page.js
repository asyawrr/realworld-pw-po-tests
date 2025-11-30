export class HomePage {
    // техническое описание страницы
    
    constructor (page) {
        this.page = page;
        this.userNameToggle = page.locator('.dropdown-toggle');
        this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    }
    
    // бизнесовые действия со страницей

    getUserNameToggle() {
        return this.userNameToggle;
    }

    async gotoCreateArticle() {
        // Ждем появления ссылки "New Article" (она появляется только для залогиненных пользователей)
        await this.newArticleLink.waitFor({ state: 'visible' });
        await this.newArticleLink.click();
    }

    async open(url) {
        await this.page.goto(url);
        // Ждем загрузки страницы
        await this.page.waitForLoadState('networkidle');
    }

}
