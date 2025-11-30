export class HomePage {
    // техническое описание страницы
    
    constructor (page) {
        this.page = page;
        this.userNameToggle = page.locator('.dropdown-toggle')
    }
    
    // бизнесовые действия со страницей

    getUserNameToggle() {
        return this.userNameToggle;
    }
}   
