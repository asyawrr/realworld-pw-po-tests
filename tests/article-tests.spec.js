import { test, expect } from '@playwright/test';
import { App } from '../src/pages/app.page';
import { ArticleBuilder, EditedArticleBuilder } from '../src/helpers/builders';
import { testUser } from '../src/config/test-user';
import * as allure from 'allure-js-commons';

const url = 'https://realworld.qa.guru/';
// beforeAll login as created user

test.beforeEach(async ({ page }) => {
  const app = new App(page);

  await app.mainPage.open(url);
  await app.mainPage.gotoLogin();
  await app.loginPage.login(testUser.email, testUser.password);
});

// 📍 region start: 'CRUD article'

test('Пользователь может создать пост с заполнением всех полей', async ({ page }) => {
  await allure.tags('Article', 'Positive');
  const article = new ArticleBuilder().withTitle().withDescription().withBody().withTags().build();
  const { title, description, body, tags } = article;

  const app = new App(page);

  await app.homePage.gotoCreateArticle();
  await app.createArticlePage.publishArticle(title, description, body, tags.join(','));

  await test.step('Проверить, что заголовок статьи содержит созданный текст', async () => {
    await expect(app.articlePage.getTitle()).toContainText(title);
  });

  await test.step('Проверить, что тело статьи содержит созданный текст', async () => {
    await expect(app.articlePage.getBody()).toContainText(body);
  });

  await test.step('Проверить, что все теги отображаются', async () => {
    for (const tagText of tags) {
      const tagElement = await app.articlePage.getTagByText(tagText);
      await expect(tagElement).toBeVisible();
    }
  });
});

test('Пользователь может отредактировать пост изменив все поля', async ({ page }) => {
  await allure.tags('Article', 'Positive');
  const article = new ArticleBuilder().withTitle().withDescription().withBody().withTags().build();
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

  await test.step('Проверить, что заголовок статьи содержит отредактированный текст', async () => {
    await expect(app.articlePage.getTitle()).toContainText(editedArticle.title);
  });

  await test.step('Проверить, что тело статьи содержит отредактированный текст', async () => {
    await expect(app.articlePage.getBody()).toContainText(editedArticle.body);
  });

  await test.step('Проверить, что все теги удалены', async () => {
    const allTags = app.articlePage.getAllTags();
    await expect(allTags).toHaveCount(0);
  });
});

test('Пользователь может удалить свой пост', async ({ page }) => {
  await allure.tags('Article', 'Positive');
  const article = new ArticleBuilder().withTitle().withDescription().withBody().withTags().build();
  const { title, description, body, tags } = article;

  const app = new App(page);

  await app.homePage.gotoCreateArticle();
  await app.createArticlePage.publishArticle(title, description, body, tags.join(','));

  await expect(app.articlePage.getTitle()).toContainText(title);

  await app.articlePage.deleteArticle();

  await expect(app.articlePage.getYourFeedTab()).toBeVisible();
  await expect(app.articlePage.getHomeLink()).toBeVisible();
});

test('Пользователь может прочитать пост другого пользователя', async ({ page }) => {
  await allure.tags('Article', 'Positive', 'GlobalFeed');
  const app = new App(page);

  // Переходим на Global Feed
  await app.homePage.goToGlobalFeedTab();
  await expect(app.homePage.getGlobalFeedButton()).toBeVisible();

  // Ждем загрузки статей в Global Feed
  await page.waitForLoadState('networkidle');
  await expect(app.feedPage.articlePreviews.first()).toBeVisible();

  let authorName = null;
  let maxPages = 20;
  let currentPage = 1;

  while (!authorName && currentPage <= maxPages) {
    // Ищем статью другого пользователя на текущей странице
    authorName = await app.feedPage.clickArticleByOtherAuthor(testUser.username);

    if (!authorName) {
      const hasNext = await app.feedPage.hasNextPage();
      if (hasNext) {
        await app.feedPage.goToNextPage();
        currentPage++;
      } else {
        break;
      }
    }
  }

  // Проверяем, что мы нашли и открыли статью другого пользователя
  expect(
    authorName,
    `Не удалось найти статью другого пользователя (не ${testUser.username}) на ${currentPage} страницах`
  ).toBeTruthy();
  await expect(app.otherUserArticlePage.getTitle()).toBeVisible();
  await expect(app.otherUserArticlePage.getBody()).toBeVisible();
  await expect(app.otherUserArticlePage.followUserButton).toBeVisible();
  await expect(app.otherUserArticlePage.followUserButton).toContainText(`Follow ${authorName}`);
});

// 📍 region 'CRUD article' end

// 📍 region 'Actions with an anrticle' start

test('Пользователь может лайкнуть любой пост на странице Global Feed', async ({ page }) => {
  await allure.tags('Article', 'Positive', 'GlobalFeed');
  const app = new App(page);

  await expect(app.homePage.getGlobalFeedButton()).toBeVisible();
  await app.homePage.goToGlobalFeedTab();

  // Ждем загрузки статей в Global Feed
  await page.waitForLoadState('networkidle');
  await expect(app.feedPage.articlePreviews.first()).toBeVisible();

  await expect(app.homePage.getMainArea()).toContainText('0');
  await app.homePage.likePost();
  await expect(app.homePage.getMainArea()).toContainText('1');
});

// 📍 region 'Actions with an anrticle' end
