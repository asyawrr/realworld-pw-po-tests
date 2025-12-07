import { test, expect } from '@playwright/test';
import { App } from '../src/pages/app.page';
import { ArticleBuilder, EditedArticleBuilder } from '../src/helpers/builders';
import { testUser } from '../src/config/test-user';

const url = 'https://realworld.qa.guru/';

// beforeAll login as created user

test.beforeEach(async ({ page }) => {
    const app = new App(page);
  
    await app.mainPage.open(url);
    await app.mainPage.gotoLogin();
    await app.loginPage.login(testUser.email, testUser.password);
    await expect(app.homePage.getUserNameToggle()).toContainText(testUser.username);
  });

// login test

// test('Пользователь может залогиниться используя email и пароль', async ({ page }) => {
//     const app = new App(page);
    
//     await app.mainPage.open(url);
//     await app.mainPage.gotoLogin();
//     await loginPage.login(testUser.email, testUser.password);

//     await expect(app.homePage.getUserNameToggle()).toContainText(user.name);
// });

// 📍 region start: 'Create/Update/Delete article' 

test('Пользователь может создать пост с заполнением всех полей', async ({ page }) => {
    const article = new ArticleBuilder()
        .withTitle()
        .withDescription()
        .withBody()
        .withTags()
        .build();
    const { title, description, body, tags } = article;

    const app = new App(page);
  
    await app.homePage.gotoCreateArticle();
    await app.createArticlePage.publishArticle(title, description, body, tags.join(','));
  
    await expect(app.articlePage.getTitle()).toContainText(title);
    await expect(app.articlePage.getBody()).toContainText(body);
    
    for (const tagText of tags) {
        const tagElement = await app.articlePage.getTagByText(tagText);
        await expect(tagElement).toBeVisible();
    }
  });

test('Пользователь может отредактировать пост изменив все поля', async ({page}) => {
  const article = new ArticleBuilder()
      .withTitle()
      .withDescription()
      .withBody()
      .withTags()
      .build();
  const { title, description, body, tags } = article;
  
  const editedArticle = new EditedArticleBuilder()
    .withBody(body)
    .withDescription(description)
    .withTitle(title)
    .build();
  
  const app = new App(page);

  await app.homePage.gotoCreateArticle();
  await app.createArticlePage.publishArticle(title, description, body, tags.join(','));

  await app.articlePage.editArticle();

  await app.editArticlePage.updateArticle(
    editedArticle.title,
    editedArticle.description,
    editedArticle.body,
    editedArticle.tags
  );

  await expect(app.articlePage.getTitle()).toContainText(editedArticle.title);
  await expect(app.articlePage.getBody()).toContainText(editedArticle.body);
  
  const allTags = app.articlePage.getAllTags();
  await expect(allTags).toHaveCount(0);

});

test('Пользователь может удалить свой пост', async ({page}) => {
  const article = new ArticleBuilder()
      .withTitle()
      .withDescription()
      .withBody()
      .withTags()
      .build();
  const { title, description, body, tags } = article;
  
  const app = new App(page);

  await app.homePage.gotoCreateArticle();
  await app.createArticlePage.publishArticle(title, description, body, tags.join(','));

  await expect(app.articlePage.getTitle()).toContainText(title);

  await app.articlePage.deleteArticle();
  
  await expect(page.getByRole('button', { name: 'Your Feed' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
});

// TODO: дописать тест на прочтение статьи другого пользователя, 
// реализовать поиск статьи другого пользователя в Global Feed

// test('Пользователь может прочитать пост другого пользователя', async ({page}) => {

// });


// 📍 region 'Create/Update/Delete article' end

// 📍 region 'Actions with an anrticle' start

test('Пользователь может лайкнуть любой пост на странице Global Feed', async({page}) => {
  const app = new App(page);

  await expect(page.getByRole('button', { name: 'Global Feed' })).toBeVisible();
  await app.homePage.goToGlobalFeedTab();

  await expect(page.getByRole('main')).toContainText('0');
  await app.homePage.likePost();
  await expect(page.getByRole('main')).toContainText('1');
});

// 📍 region 'Actions with an anrticle' end