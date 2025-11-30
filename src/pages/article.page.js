export class ArticlePage {
    constructor(page) {
        this.page = page;

        this.title = page.locator('h1:visible') 
        this.author = page.locator('a.author[href*="/profile/"]');
        this.deleteButton = page.getByRole('button', { name: 'Delete Article' });
        this.editButton = page.getByRole('button', { name: 'Edit Article' });
        this.body = page.locator('p').nth(0)
        this.tag = page.getByText('реклама', { exact: true });
        this.commentTextarea = page.locator('textarea[placeholder="Write a comment..."]');
        this.postCommentButton = page.getByRole('button', { name: 'Post Comment' });
        this.commentList = page.locator('.card.comment-card');
    }

    async open(slug) {
        await this.page.goto(`https://realworld.qa.guru/#/article/${slug}`);
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
    }

    async clickEdit() {
        await this.editButton.click();
    }
}