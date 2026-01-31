import { test, expect } from '@playwright/test';
import { App } from '../src/pages/app.page';
import * as allure from 'allure-js-commons';

const url = 'https://realworld.qa.guru/';

// 📍 region start: 'Feed'

test('Пользователь может перейти на другую страницу ленты статей', async ({ page }) => {
  await allure.tags('GlobalFeed', 'Pagination', 'Positive');
  const app = new App(page);

  await app.mainPage.open(url);

  await expect(app.feedPage.getPagination()).toBeVisible();
  await expect(app.feedPage.getCurrentPageButton(1)).toBeVisible();

  // Будем сравнивать что названия на первой странице заголовки статей отличаются от второй
  const firstPageTitles = await app.feedPage.getArticleTitles();

  await app.feedPage.goToPage(2);
  await expect(app.feedPage.getCurrentPageButton(2)).toBeVisible();
  await expect(app.feedPage.getPageButton(1)).toBeVisible();

  // Добавила эту проверку, иак как без нее тест падал, ощущение, что страница не успела обновиться
  await page.waitForLoadState('networkidle');

  const secondPageTitles = await app.feedPage.getArticleTitles();

  expect(secondPageTitles).not.toEqual(firstPageTitles);
});

// 📍 region end: 'Feed'