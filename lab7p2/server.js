const express = require('express');
const path = require('path');

const app = express();
const PORT = 5501;

// статические файлы находятся в папке public
app.use(express.static(path.join(__dirname, 'public')));

// Маршрут для главной страницы
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Маршрут для скачивания JSON файла
app.get('/download', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'recipes.json');
    res.download(filePath, 'recipes.json', (err) => {
        if (err) {
            console.error('Ошибка при скачивании файла:', err);
            res.status(500).send('Ошибка при скачивании файла');
        }
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
app.get('/download', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'recipes.json');
    res.download(filePath, 'recipes.json', (err) => {
        if (err) {
            console.error('Ошибка при скачивании файла:', err);
            res.status(500).send('Ошибка при скачивании файла');
        }
    });
});