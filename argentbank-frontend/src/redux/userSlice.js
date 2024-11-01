import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Action asynchrone pour la connexion de l'utilisateur
export const loginAsync = createAsyncThunk(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials), // Envoi des identifiants de l'utilisateur
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la connexion');
      }

      const data = await response.json();
      return data; // S'assurer de retourner toutes les données utilisateur, y compris le token
    } catch (error) {
      console.error("Erreur d'authentification :", error);
      return rejectWithValue(error.message);
    }
  }
);

// Action asynchrone pour récupérer les informations utilisateur
export const getUserInfo = createAsyncThunk(
  'user/getUserInfo',
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Envoi du token pour l'authentification
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données utilisateur');
      }

      const userInfo = await response.json();
      return userInfo;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Action asynchrone pour mettre à jour le nom d'utilisateur
export const updateUserName = createAsyncThunk(
  'user/updateUserName',
  async ({ token, newUserName }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Utilisation du token pour l'authentification
        },
        body: JSON.stringify({ userName: newUserName }), // Envoi du nouveau nom d'utilisateur
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du nom d’utilisateur');
      }

      return newUserName;
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
    rememberMe: false,
    savedEmail: '',
    savedPassword: '',
    status: 'idle',
    error: null,
  },
  reducers: {
    logout(state) {
      state.token = null;
      state.userInfo = null;
      state.status = 'idle';
      state.error = null;
      // Ne pas réinitialiser savedEmail et savedPassword si rememberMe est activé
      if (!state.rememberMe) {
        state.savedEmail = '';
        state.savedPassword = '';
      }
    },
    updateUserInfo(state, action) {
      state.userInfo = { ...state.userInfo, ...action.payload }; // Mise à jour des informations utilisateur
    },
    setRememberMe(state, action) {
      state.rememberMe = action.payload;
    },
    setSavedCredentials(state, action) {
      // Enregistrement des données d'identification de l'utilisateur
      const { email, password } = action.payload;
      state.savedEmail = email;
      state.savedPassword = password;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Enregistrement du token et des informations utilisateur dans l'état
        state.token = action.payload.token; 
        state.userInfo = action.payload.user; // S'assurer de renvoyer les bonnes informations utilisateur
        // Si rememberMe est activé, enregistrer les données
        if (state.rememberMe) {
          state.savedEmail = action.payload.user.email; 
          state.savedPassword = action.payload.password; // Enregistrement du mot de passe uniquement si nécessaire
        }
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userInfo = action.payload; // Stocker les informations de l'utilisateur récupérées
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateUserName.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (state.userInfo) {
          state.userInfo.userName = action.payload; // Mise à jour du nom d'utilisateur
        }
      })
      .addCase(updateUserName.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout, updateUserInfo, setRememberMe, setSavedCredentials } = userSlice.actions;
export default userSlice.reducer;






















