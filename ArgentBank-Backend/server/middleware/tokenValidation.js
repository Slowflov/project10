const jwt = require('jsonwebtoken');

module.exports.validateToken = (req, res, next) => {
  let response = {
    status: 401, // Устанавливаем статус по умолчанию для ошибок
    message: 'Unauthorized' // Общее сообщение об ошибке
  };

  try {
    // Проверяем наличие заголовка авторизации
    if (!req.headers.authorization) {
      throw new Error('Token is missing from header');
    }

    // Извлекаем токен из заголовка
    const userToken = req.headers.authorization.split('Bearer ')[1].trim(); // Исправлено: добавлен пробел после 'Bearer'
    
    // Проверяем токен
    const decodedToken = jwt.verify(
      userToken,
      process.env.SECRET_KEY || 'default-secret-key'
    );

    // При успешной валидации токена, сохраняем информацию о пользователе в объекте запроса
    req.user = decodedToken; // Сохраняем декодированный токен для дальнейшего использования
    return next(); // Переходим к следующему middleware
  } catch (error) {
    console.error('Error in tokenValidation.js', error);
    response.message = error.message; // Устанавливаем сообщение об ошибке из исключения
  }

  return res.status(response.status).send(response); // Отправляем ответ с ошибкой
};

