export class CreateArticlePage {
  // техническое описание страницы

  constructor(page) {
    this.page = page;

    this.publishButton = page.getByRole('button', { name: 'Publish Article' });
    this.titleInput = page.getByRole('textbox', { name: 'Article Title' });
    this.descriptionInput = page.getByRole('textbox', { name: /What's this article about\?/i });
    this.bodyInput = page.getByRole('textbox', { name: 'Write your article (in markdown)' });
    this.tagsInput = page.getByRole('textbox', { name: 'Enter tags' });
  }

  // бизнесовые действия со страницей

  async publishArticle(title, description, body, tag) {
    await this.titleInput.click();
    await this.titleInput.fill(title);

    await this.descriptionInput.click();
    await this.descriptionInput.fill(description);

    await this.bodyInput.click();
    await this.bodyInput.fill(body);

    await this.tagsInput.click();
    await this.tagsInput.fill(tag);

    await this.publishButton.click();
  }
}
