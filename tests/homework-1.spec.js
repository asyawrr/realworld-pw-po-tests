import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { ArticlePage } from '../src/pages/article.page';
import { HomePage } from '../src/pages/home.page';
import { CreateArticlePage } from '../src/pages/createArticle.page';
import { MainPage } from '../src/pages/main.page';
import { LoginPage } from '../src/pages/login.page';
import { testUser } from './test-user';

const url = 'https://realworld.qa.guru/';

const timestamp = new Date().toISOString().replace('T', ' ').replace(/\..+/, '').replace(/-/g, ':');

const article = {
    title: faker.book.title() + ' ' + timestamp,
    description: faker.book.author(),
    body: faker.lorem.sentences({ min: 1, max: 3 }),
    tag: 'реклама'
}

// beforeAll login

test.beforeEach(async ({ page }) => {
    const mainPage = new MainPage(page);
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
  
    await mainPage.open(url);
    await mainPage.gotoLogin();
    await loginPage.login(testUser.email, testUser.password);
    await expect(homePage.getUserNameToggle()).toContainText(testUser.username);
  });

// login

// test('Пользователь может залогиниться используя email и пароль', async ({ page }) => {
//     const homePage = new HomePage(page);
//     const loginPage = new LoginPage(page);
//     const mainPage = new MainPage(page);
    
//     await mainPage.open(url);
//     await mainPage.gotoLogin();
//     await loginPage.login(testUser.email, testUser.password);

//     await expect(homePage.getUserNameToggle()).toContainText(user.name);
// });

// region start: 'CRUD article' 

test.only('Пользователь может создать пост с заполнением всех полей', async ({ page }) => {
    const { title, description, body, tag } = article;
  
    const homePage = new HomePage(page);
    const createArticlePage = new CreateArticlePage(page);
    const articlePage = new ArticlePage(page);
  
    await homePage.gotoCreateArticle();
    await createArticlePage.publishArticle(title, description, body, tag);
  
    await expect(articlePage.getTitle()).toContainText(title);
    await expect(articlePage.getBody()).toContainText(body);
    await expect(articlePage.getTag()).toContainText(tag);
  });

test('Пользователь может отредактировать пост изменив все поля', async ({page}) => {

});

test('Пользователь может прочитать чужой пост', async ({page}) => {

});

test('Пользователь может удалить свой пост', async ({page}) => {

});

// region 'CRUD article' end

// region start: 'Feed'

test('Пользователь может лайкнуть article', async ({page}) => {

});

test('Пользователь может перейти на другую страницу ленты статей', async ({page}) => {

});

// region end: 'Feed'

