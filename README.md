# realworld-pw-po-tests

Automated functional UI tests for the [RealWorld](https://realworld.qa.guru/) application using Playwright and Page Object Model (POM) pattern.

## Description

This project contains tests for the RealWorld web app:

- Article CRUD operations (create, edit, delete)
- Article feed pagination as unauthenticated user
- Like article in Global Feed
- User authentication

## Technologies

- **Playwright** - browser automation framework
- **Page Object Model** - design pattern for test code organization
- **Builder Pattern** - for test data generation
- **Faker.js** - random test data generation
- **dotenv** - environment variables management

## Test Coverage

- Create article with all fields
- Edit article (modify all fields)
- Delete article
- Like article in Global Feed
- Article feed pagination
