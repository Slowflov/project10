// Основной файл сервера (server.js)
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const swaggerDocs = yaml.load('./swagger.yaml');
const dbConnection = require('./database/connection'); // Подключаем модуль для подключения к базе данных

// Не требуется загрузка переменных окружения, так как мы убрали использование DB_URI
// require('dotenv').config();  // Удалено

const app = express();
const PORT = process.env.PORT || 3001;

// Подключение к базе данных
dbConnection();  // Подключение к базе данных без использования DB_URI

// Обработка проблем CORS
app.use(cors());

// Middleware для запросов
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Обработка пользовательских маршрутов
app.use('/api/v1/user', require('./routes/userRoutes')); // Оставляем маршруты для пользователя

// API Документация
if (process.env.NODE_ENV !== 'production') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}

app.get('/', (req, res) => {
  res.send('Hello from my Express server v2!');
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});




