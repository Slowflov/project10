// UserInfo.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, getUserInfo } from '../redux/userSlice';
import { Link, useNavigate } from 'react-router-dom';

const UserInfo = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const token = useSelector((state) => state.user.token); // Получаем токен из состояния
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (token) {
        try {
          await dispatch(getUserInfo(token)).unwrap(); // Обработка успешного получения данных
        } catch (error) {
          console.error('Ошибка получения информации о пользователе:', error);
        }
      }
    };

    fetchUserInfo();
  }, [dispatch, token]);

  const handleLogout = () => {
    console.log("Кнопка выхода нажата");
    dispatch(logout());
    navigate('/sign-in'); // Перенаправляем на страницу входа
  };

  return (
    <span className="main-nav-item">
      {userInfo ? (
        <>
          <i className="fa fa-user-circle"></i>
          <Link to="/user" className="user-info-link">
            {userInfo.userName || userInfo.email}
          </Link>
          <button onClick={handleLogout} className="main-nav-item">
            <i className="fa fa-sign-out"></i>Sign out
          </button>
        </>
      ) : (
        <Link to="/sign-in" className="main-nav-item">
          <i className="fa fa-user-circle"></i>Sign In
        </Link>
      )}
    </span>
  );
};

export default UserInfo;













