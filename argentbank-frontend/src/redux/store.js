// redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './userSlice'; // Убедитесь, что путь верный

// Настройки для redux-persist
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

// Создаем Redux store
export const store = configureStore({
  reducer: {
    user: persistedReducer, // Используем редьюсер с persist
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Отключаем проверку сериализуемости
    }),
});

// Создаем persistor для сохранения состояния
export const persistor = persistStore(store);















