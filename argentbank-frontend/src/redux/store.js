import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import transactionReducer from './transactionSlice'; // Импортируем slice для транзакций

// Функция для получения информации о пользователе из localStorage
const getInitialUserState = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  return {
    userInfo: userInfo || null, // Если есть данные, используем их
  };
};

// Создание Redux store с начальным состоянием
const store = configureStore({
  reducer: {
    user: userReducer,
    transactions: transactionReducer, // Добавляем новый редьюсер для транзакций
  },
  preloadedState: {
    user: getInitialUserState(), // Инициализация состояния пользователя
  },
});

export default store;


