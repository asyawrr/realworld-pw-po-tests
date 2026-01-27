// Страница сделана была для теста прочтения статьи другого пользователя.
// TODO в article-crud-tests добавить тест на прочтение страницы другого пользователя

export class OtherUserArticlePage {
  constructor(page) {
    this.page = page;

    this.title = page.locator('h1:visible');
    this.author = page.locator('a.author[href*="/profile/"]');
    this.body = page.locator('p').nth(0);
    this.followUserButton = page
      .locator('button')
      .filter({ hasText: /Follow/ })
      .first();
    this.likeButton = page.locator('button').filter({ hasText: 'Favorite ( 0 )' }).first();
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

  getFollowButton() {
    return this.followUserButton;
  }

  // followUser () {

  // }
}
