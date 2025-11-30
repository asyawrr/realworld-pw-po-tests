import dotenv from 'dotenv';

// Загружаем переменные окружения из .env файла
dotenv.config();

export const testUser = {
    email: process.env.TEST_USER_EMAIL,
    password: process.env.TEST_USER_PASSWORD,
    username: process.env.TEST_USER_USERNAME,
};