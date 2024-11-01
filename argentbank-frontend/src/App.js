import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store'; // Vérifiez que le chemin est correct
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import UserProfile from './pages/UserProfile';
import EditName from './components/EditName'; // Import du composant EditName
import ViewTransactions from './components/ViewTransactions'; // Import du composant ViewTransactions
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} /> {/* Route vers la page d'accueil */}
            <Route path="/sign-in" element={<SignIn />} /> {/* Route vers la page de connexion */}
            <Route path="/user" element={<ProtectedRoute element={<UserProfile />} />} /> {/* Route protégée vers UserProfile */}
            <Route path="/edit-name" element={<ProtectedRoute element={<EditName />} />} /> {/* Nouvelle route pour EditName */}
            <Route path="/transactions" element={<ProtectedRoute element={<ViewTransactions />} />} /> {/* Nouvelle route pour ViewTransactions */}
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
















