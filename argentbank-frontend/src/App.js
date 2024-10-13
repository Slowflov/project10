import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './redux/userSlice'; // Убедитесь, что путь верный
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import UserProfile from './pages/UserProfile';
import EditName from './pages/EditName'; 
import { useSelector } from 'react-redux';

// Компонент защищенного маршрута
const ProtectedRoute = ({ element }) => {
  const userInfo = useSelector((state) => state.user.userInfo); // Изменение на userInfo
  return userInfo && userInfo.email ? element : <Navigate to="/sign-in" />;
};

const store = configureStore({
  reducer: {
    user: userReducer, // Используем редьюсер пользователя
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/user" element={<ProtectedRoute element={<UserProfile />} />} />
          <Route path="/edit-name" element={<ProtectedRoute element={<EditName />} />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;











