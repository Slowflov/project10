import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const userInfo = useSelector((state) => state.user.userInfo); // Vérifie la présence des informations utilisateur
  const token = useSelector((state) => state.user.token); // Vérifie la présence du token

  // Si userInfo est absent et le token aussi, redirige vers la page de connexion
  return (userInfo && userInfo.email) || token ? element : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;

