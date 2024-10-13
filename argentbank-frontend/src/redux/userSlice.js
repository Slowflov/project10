import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Асинхронное действие для получения данных пользователя из API с использованием fetch
export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/user/${userId}`);
      if (!response.ok) {
        throw new Error('Ошибка при получении данных');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Асинхронное действие для обновления данных пользователя с использованием fetch
export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/user/${userData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error('Ошибка при обновлении данных');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Асинхронное действие для входа пользователя
export const signIn = createAsyncThunk(
  'user/signIn',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        throw new Error('Ошибка при входе');
      }
      const data = await response.json();
      localStorage.setItem('token', data.token); // Сохраняем токен в localStorage
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    login(state, action) {
      state.userInfo = action.payload;
    },
    logout(state) {
      state.userInfo = null; // Сбрасываем информацию о пользователе
      localStorage.removeItem('token'); // Удаляем токен из localStorage
      localStorage.removeItem('userInfo'); // Удаляем информацию о пользователе из localStorage
    },
    updateName(state, action) {
      if (state.userInfo) {
        state.userInfo.userName = action.payload.userName;
        state.userInfo.firstName = action.payload.firstName;
        state.userInfo.lastName = action.payload.lastName;
      }
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userInfo = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userInfo = { ...state.userInfo, ...action.payload };
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(signIn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userInfo = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { login, logout, updateName, setUserInfo } = userSlice.actions;
export default userSlice.reducer;












