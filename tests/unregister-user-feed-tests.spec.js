import { test, expect } from '@playwright/test';
import { App } from '../src/pages/app.page';

const url = 'https://realworld.qa.guru/';

// 📍 region start: 'Feed'

test('Пользователь может перейти на другую страницу ленты статей', async ({page}) => {
  const app = new App(page);

  await app.mainPage.open(url);

  await expect(app.feedPage.pagination).toBeVisible();
  await expect(page.getByRole('button', { name: 'Page 1 is your current page' })).toBeVisible();

  // Будем сравнивать что названия на первой странице заголовки статей отличаются от второй
  const firstPageTitles = await app.feedPage.getArticleTitles();

  await app.feedPage.goToPage(2);
  await expect(page.getByRole('button', { name: 'Page 2 is your current page' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Page 1' })).toBeVisible();

  // Добавила эту проверку, иак как без нее тест падал, ощущение, что страница не успела обновиться
  await page.waitForLoadState('networkidle');
  
  const secondPageTitles = await app.feedPage.getArticleTitles();

  expect(secondPageTitles).not.toEqual(firstPageTitles);

});

// 📍 region end: 'Feed'