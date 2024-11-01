import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './userSlice';

// Configuration pour redux-persist
const persistConfig = {
  key: 'root', // Clé de base pour le stockage persistant
  storage,     // Type de stockage utilisé
};

const persistedReducer = persistReducer(persistConfig, userReducer);

// Création du store Redux
export const store = configureStore({
  reducer: {
    user: persistedReducer, // Utilisation du reducer persistant
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Désactivation de la vérification de la sérialisation
    }),
});

// Création du persistor pour la sauvegarde de l'état
export const persistor = persistStore(store);

















