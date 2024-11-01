// UserInfo.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, getUserInfo } from '../redux/userSlice';
import { Link, useNavigate } from 'react-router-dom';

const UserInfo = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo); // Sélection de l'information utilisateur depuis le store
  const token = useSelector((state) => state.user.token); // Récupération du token depuis l'état
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (token) {
        try {
          await dispatch(getUserInfo(token)).unwrap(); // Traitement en cas de récupération réussie des données
        } catch (error) {
          console.error('Erreur lors de la récupération des informations utilisateur :', error);
        }
      }
    };

    fetchUserInfo(); // Appel de la fonction pour récupérer les informations utilisateur
  }, [dispatch, token]);

  const handleLogout = () => {
    console.log("Bouton de déconnexion appuyé");
    dispatch(logout()); // Envoi de l'action de déconnexion
    navigate('/sign-in'); // Redirection vers la page de connexion
  };

  return (
    <span className="main-nav-item">
      {userInfo ? (
        <>
          <i className="fa fa-user-circle"></i>
          <Link to="/user" className="user-info-link">
            {userInfo.userName || userInfo.email} {/* Affichage du nom d'utilisateur ou de l'email */}
          </Link>
          <button onClick={handleLogout} className="main-nav-item">
            <i className="fa fa-sign-out"></i>Sign out {/* Bouton de déconnexion */}
          </button>
        </>
      ) : (
        <Link to="/sign-in" className="main-nav-item">
          <i className="fa fa-user-circle"></i>Sign In {/* Lien vers la connexion si non authentifié */}
        </Link>
      )}
    </span>
  );
};

export default UserInfo;














