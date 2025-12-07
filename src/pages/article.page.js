export class ArticlePage {
    constructor(page) {
        this.page = page;

        this.title = page.locator('h1:visible') 
        this.author = page.locator('a.author[href*="/profile/"]');
        this.deleteButton = page.getByRole('button', { name: 'Delete Article' }).nth(1);
        this.editButton = page.locator('button').filter({ hasText: 'Edit Article' }).first()
        this.body = page.locator('p').nth(0)
        this.tag = page.getByText('реклама', { exact: true });
        this.commentTextarea = page.locator('textarea[placeholder="Write a comment..."]');
        this.postCommentButton = page.getByRole('button', { name: 'Post Comment' });
        this.commentList = page.locator('.card.comment-card');
    }
    
    getTitle() {
        return this.title;
    }

    getBody() {
        return this.body;
    }

    getTag() {
        return this.tag;
    }

    async deleteArticle() {
        this.page.once('dialog', async dialog => {
            await dialog.accept();
        });

        await this.deleteButton.click();

        // this.page.once('dialog', dialog => {
        //     console.log(`Dialog message: ${dialog.message()}`);
        //     dialog.dismiss().catch(() => {});
        //   });
    }

    async editArticle() {
        await this.editButton.click();
    }

    async getTagByText(tagText) {
        return this.page.getByText(tagText, { exact: true });
    }

    getAllTags() {
        return this.page.locator('.tag-list .tag-default, .tag-pill');
    }
}