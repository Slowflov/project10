import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const userInfo = useSelector((state) => state.user.userInfo); // Проверяем наличие информации о пользователе
  console.log("Проверка ProtectedRoute, userInfo:", userInfo); // Лог для проверки
  return userInfo && userInfo.email ? element : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
