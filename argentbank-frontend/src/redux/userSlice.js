// userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Асинхронное действие для входа пользователя
export const loginAsync = createAsyncThunk(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Ошибка при входе');
      }

      const data = await response.json();
      console.log("Данные после успешного входа:", data);
      return data; // Возвращаем данные от API (токен, данные пользователя)
    } catch (error) {
      console.error("Ошибка авторизации:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Асинхронное действие для получения информации о пользователе
export const getUserInfo = createAsyncThunk(
  'user/getUserInfo',
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Ошибка при получении данных пользователя');
      }
      const userInfo = await response.json();
      return userInfo;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Асинхронное действие для обновления имени пользователя
export const updateUserName = createAsyncThunk(
  'user/updateUserName',
  async ({ token, newUserName }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ userName: newUserName }),
      });
      if (!response.ok) {
        throw new Error('Ошибка при обновлении имени пользователя');
      }
      return newUserName; // Возвращаем обновленное имя пользователя
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    token: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout(state) {
      state.token = null; // Сбрасываем токен
      state.userInfo = null; // Сбрасываем информацию о пользователе
      state.status = 'idle'; // Сбрасываем статус
      state.error = null; // Сбрасываем ошибку
    },
    updateUserInfo(state, action) { // Новый редьюсер для обновления информации о пользователе
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token; // Сохраняем токен
        state.userInfo = action.payload.user; // Сохраняем информацию о пользователе
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Сохраняем ошибку
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userInfo = action.payload; // Сохраняем информацию о пользователе
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Сохраняем ошибку
      })
      .addCase(updateUserName.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (state.userInfo) {
          state.userInfo.userName = action.payload; // Обновляем имя пользователя
          console.log('Текущий статус пользователя:', state);
        }
      })
      .addCase(updateUserName.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Сохраняем ошибку
      });
  },
});

// Экспортируем действия
export const { logout, updateUserInfo } = userSlice.actions;
export default userSlice.reducer;



















