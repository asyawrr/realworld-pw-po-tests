export class HomePage {
    // техническое описание страницы
    
    constructor (page) {
        this.page = page;
        this.userNameToggle = page.locator('.dropdown-toggle');
        this.newArticleLink = page.getByRole('link', { name: 'New Article' });
        this.likeButton = page.locator('button').filter({ hasText: '( 0 )' }).first();
        this.globalFeedButton = page.getByRole('button', { name: 'Global Feed' });
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

    async likePost() {
        await this.likeButton.click();
    }

    async goToGlobalFeedTab() {
        await this.globalFeedButton.click();
    }



}
