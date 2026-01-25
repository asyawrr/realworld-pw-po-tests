import {test} from '@playwright/test';

export class EditArticlePage {
    // техническое описание страницы
    
    constructor (page) {
        this.page = page;

        this.updateButton = page.getByRole('button', { name: 'Update Article' });
        this.titleInput = page.getByRole('textbox', { name: 'Article Title' });
        this.descriptionInput = page.getByRole('textbox', { name: /What's this article about\?/i });
        this.bodyInput = page.getByRole('textbox', { name: 'Write your article (in markdown)' });
        this.tagsInput = page.getByRole('textbox', { name: 'Enter tags' });
    }
    
    // бизнесовые действия со страницей

    async updateArticle(title, description, body, tags) {
        return test.step ('Изменение полей в созданном article', async (step) => { 
        // Заполняем поле заголовка
        await this.titleInput.click();
        await this.titleInput.fill(title);

        // Заполняем поле описания
        await this.descriptionInput.click();
        await this.descriptionInput.fill(description);

        // Заполняем поле тела статьи
        await this.bodyInput.click();
        await this.bodyInput.fill(body);

        // Заполняем теги
        const tagsString = Array.isArray(tags) ? tags.join(',') : (tags ?? '');
        await this.tagsInput.click();
        await this.tagsInput.fill(tagsString);
        
        // Сохраняем изменения
        await this.updateButton.click();
    })
    }
}
