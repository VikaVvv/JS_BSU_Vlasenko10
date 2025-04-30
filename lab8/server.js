const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override'); // Добавьте эту строку
const app = express();
const recipesRouter = require('./rest');

// Настройки приложения
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // Добавьте эту строку
app.use(express.static('public'));

// Подключение REST API
app.use('/api', recipesRouter);

// Старт сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});