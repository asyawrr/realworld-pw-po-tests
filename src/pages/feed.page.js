export class FeedPage {
  constructor(page) {
    this.page = page;

    this.articlePreviews = page.locator('.article-preview');
    this.pagination = page.getByRole('navigation', { name: 'Pagination' });
    this.nextPageButton = page.locator('.pagination .page-item:last-child .page-link');
    this.articleAuthors = this.articlePreviews.locator('.author');
    this.articlePreviewLinks = this.articlePreviews.locator('.preview-link');
    this.articleTitles = this.articlePreviews.locator('.preview-link h1');

    this.pageButtonByCurrent = (pageNumber) =>
      this.pagination.getByRole('button', {
        name: `Page ${pageNumber} is your current page`
      });
    this.pageButtonByNumber = (pageNumber) =>
      this.pagination.getByRole('button', { name: `Page ${pageNumber}`, exact: true });
  }

  getPagination() {
    return this.pagination;
  }

  async getArticleTitles() {
    return await this.articleTitles.allTextContents();
  }

  async getArticleAuthors() {
    return await this.articleAuthors.allTextContents();
  }

  async findArticleByOtherAuthor(currentUserUsername) {
    await this.articlePreviews.first().waitFor({ state: 'visible' });

    const count = await this.articlePreviews.count();

    for (let i = 0; i < count; i++) {
      await this.articleAuthors.nth(i).waitFor({ state: 'visible' });
      const author = await this.articleAuthors.nth(i).textContent();

      if (author && author.trim() !== currentUserUsername) {
        return { index: i, authorName: author.trim() };
      }
    }
    return null;
  }

  async clickArticleByOtherAuthor(currentUserUsername) {
    const result = await this.findArticleByOtherAuthor(currentUserUsername);
    if (result) {
      await this.articlePreviewLinks.nth(result.index).click();
      return result.authorName;
    }
    return null;
  }

  async hasNextPage() {
    if (!(await this.pagination.isVisible())) {
      return false;
    }

    const parentClass = await this.nextPageButton.locator('..').getAttribute('class');
    return !parentClass?.includes('disabled');
  }

  async goToNextPage() {
    const hasNext = await this.hasNextPage();
    if (hasNext) {
      await this.nextPageButton.click();
      // Ожидание прорисовки страницы, так как в процессе отладки теста обнаружилось, что статья с другим автором находилась гораздо раньше
      await this.page.waitForLoadState('networkidle');
      await this.articlePreviews.first().waitFor({ state: 'visible' });
      // Дополнительное ожидание для полной загрузки контента
      await this.page.waitForTimeout(500);
    }
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
