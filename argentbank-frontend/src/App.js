import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store'; // Убедитесь, что путь правильный
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import UserProfile from './pages/UserProfile';
import EditName from './components/EditName'; // Импортируем компонент EditName
import ViewTransactions from './components/ViewTransactions'; // Импортируем компонент ViewTransactions
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/user" element={<ProtectedRoute element={<UserProfile />} />} />
            <Route path="/edit-name" element={<ProtectedRoute element={<EditName />} />} /> {/* Новый маршрут для EditName */}
            <Route path="/transactions" element={<ProtectedRoute element={<ViewTransactions />} />} /> {/* Новый маршрут для ViewTransactions */}
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;















