import {
    HomePage,
    MainPage,
    RegisterPage,
    LoginPage,
    ArticlePage,
    CreateArticlePage,
    EditArticlePage,
    OtherUserArticlePage,
    FeedPage
} from './index';

export class App {
    constructor(page) {
        this.page = page;

        this.homePage = new HomePage(page);
        this.mainPage = new MainPage(page);
        this.registerPage = new RegisterPage(page);
        this.loginPage = new LoginPage(page);
        this.articlePage = new ArticlePage(page);
        this.createArticlePage = new CreateArticlePage(page);
        this.editArticlePage = new EditArticlePage(page);
        this.otherUserArticlePage = new OtherUserArticlePage(page);
        this.feedPage = new FeedPage(page);
    }
}