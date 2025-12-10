export class ArticlePage {
    constructor(page) {
        this.page = page;

        this.title = page.locator('h1:visible');
        this.body = page.locator('p').nth(0);

        this.deleteButton = page.getByRole('button', { name: 'Delete Article' }).nth(1);
        this.editButton = page.locator('button').filter({ hasText: 'Edit Article' }).first();

        this.yourFeedTab = page.getByRole('button', { name: 'Your Feed' });
        this.homeLink = page.getByRole('link', { name: 'Home' });

        this.allTagsList = page.locator('.tag-list .tag-default, .tag-pill');
        this.tagByText = (tagText) => page.getByText(tagText, { exact: true });
    }
    
    getTitle() {
        return this.title;
    }

    getBody() {
        return this.body;
    }

    getYourFeedTab() {
        return this.yourFeedTab;
    }

    getHomeLink() {
        return this.homeLink;
    }

    async deleteArticle() {
        this.page.once('dialog', async dialog => {
            await dialog.accept();
        });

        await this.deleteButton.click();
    }

    async editArticle() {
        await this.editButton.click();
    }

    getTagByText(tagText) {
        return this.tagByText(tagText);
    }

    getAllTags() {
        return this.allTagsList;
    }
}