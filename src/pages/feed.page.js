export class FeedPage {
    constructor(page) {
        this.page = page;

        this.articlePreviews = page.locator('.article-preview');
        this.pagination = page.getByRole('navigation', { name: 'Pagination' });
        //this.activePageNumber = this.pagination.locator('.page-item.active .page-link');
        this.pageButtonByCurrent = (pageNumber) =>
            page.getByRole('button', { name: `Page ${pageNumber} is your current page` });
        this.pageButtonByNumber = (pageNumber) =>
            page.getByRole('button', { name: `Page ${pageNumber}` });
    }

    getPagination() {
        return this.pagination;
    }

    async getArticleTitles() {
        return await this.articlePreviews
            .locator('.preview-link h1')
            .allTextContents();
    }

    async goToPage(pageNumber) {
        const pageButton = this.getPageButton(pageNumber);
        await pageButton.click();
    }

    getCurrentPageButton(pageNumber) {
        return this.pageButtonByCurrent(pageNumber);
    }

    getPageButton(pageNumber) {
        return this.pageButtonByNumber(pageNumber);
    }
}
