import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo, logout } from '../redux/userSlice';
import { Link, useNavigate } from 'react-router-dom';

const UserInfo = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token'); // Получаем токен
      if (!token) {
        return; // Если токен отсутствует, выходим из функции
      }

      try {
        const response = await fetch('http://localhost:3001/api/v1/user/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          dispatch(logout()); // Выходим из системы, если токен недействителен
          return; // Игнорируем ошибку 401
        }

        if (!response.ok) {
          throw new Error('Ошибка при получении данных пользователя');
        }

        const data = await response.json();
        dispatch(setUserInfo(data));
      } catch (error) {
        console.error('Ошибка:', error); // Логируем ошибку
      }
    };

    fetchUserData();
  }, [dispatch]);

  const handleLogout = () => {
    console.log("Sign out button clicked");
    dispatch(logout());
    localStorage.removeItem('token'); // Удаляем токен из localStorage
    console.log("Token removed."); // Лог для отладки
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
            <i className="fa fa-sign-out"></i>Sign Out
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










