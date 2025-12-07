import dotenv from 'dotenv';

// Загружаем переменные окружения из .env файла
// Тут я хотела попробовать не регистрировать каждый раз нового юзера, а заходить под существующим. 
// Для этого создала .env файл с тремя строчками, где в каждой без кавычек ввела валидные данные существ. пользователя
// TEST_USER_EMAIL = 
// TEST_USER_PASSWORD = 
// TEST_USER_USERNAME = 
dotenv.config();

export const testUser = {
    email: process.env.TEST_USER_EMAIL,
    password: process.env.TEST_USER_PASSWORD,
    username: process.env.TEST_USER_USERNAME,
};