const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const tokenValidation = require('../middleware/tokenValidation');

// Регистрация пользователя
router.post('/signup', userController.createUser);

// Вход пользователя
router.post('/login', userController.loginUser);

// Получение профиля пользователя
router.get(
  '/profile',
  tokenValidation.validateToken,
  userController.getUserProfile
);

// Обновление профиля пользователя
router.put(
  '/profile',
  tokenValidation.validateToken,
  userController.updateUserProfile
);

// Новый маршрут для получения информации о пользователе
router.get('/', tokenValidation.validateToken, userController.getUserProfile);

module.exports = router;

