// Скопировала из занятий, не используется так как используется test-user.js 

import { faker } from '@faker-js/faker';
/*
const user = {
    email: faker.internet.email({provider: 'qa.guru' }),
    name: faker.person.fullName(), // 'Allen Brown'
    password: faker.internet.password({ length: 10 }),
    method() {}
}
*/

export class UserBuilder {
    // хотим генерить email
    withEmail(email) {
        this.email = email ?? faker.internet.email({provider: 'qa.guru' });
        return this;
    }

    withName(name) {
        this.name = name ?? faker.person.fullName(); // 'Allen Brown'
        return this;
    }

    withPassword(length = 10) {
        this.password = faker.internet.password({ length: length });
        return this;
    }

    build()
    {
        const result = {...this};
        return result;
    }

}