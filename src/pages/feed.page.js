export class FeedPage {
    constructor(page) {
        this.page = page;

        this.articlePreviews = page.locator('.article-preview');
        this.pagination = page.getByRole('navigation', { name: 'Pagination' });
        this.activePageNumber = this.pagination.locator('.page-item.active .page-link');
    }

    async getArticleTitles() {
        return await this.articlePreviews
            .locator('.preview-link h1')
            .allTextContents();
    }

    async goToPage(pageNumber) {
        const pageButton = this.page.getByRole('button', { name: `Page ${pageNumber}` });
        await pageButton.click();
    }
}