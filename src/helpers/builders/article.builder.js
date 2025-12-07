import { faker } from '@faker-js/faker';

const generateUniqueTags = () => {
    const tagCount = faker.number.int({ min: 1, max: 3 });
    const tags = new Set();
    
    while (tags.size < tagCount) {
        tags.add(faker.word.noun());
    }
    return Array.from(tags);
};

const timestamp = new Date().toISOString().replace('T', ' ').replace(/\..+/, '').replace(/-/g, ':');

export class ArticleBuilder {
    withTitle(title) {
        this.title = title ?? faker.book.title() + ' ' + timestamp;
        return this;
    }

    withDescription(description) {
        this.description = description ?? faker.book.author();
        return this;
    }

    withBody(body) {
        this.body = body ?? faker.lorem.sentences({ min: 1, max: 3 });
        return this;
    }

    withTags(tags) {
        this.tags = tags ?? generateUniqueTags();
        return this;
    }

    build() {
        const result = {...this};
        return result;
    }
}

