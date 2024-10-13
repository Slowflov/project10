import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateName, setUserInfo } from '../redux/userSlice';
import '../css/main.css';
import argentBankLogo from '../img/argentBankLogo.png';
import UserInfo from '../redux/userInfo'; // Импортируем UserInfo

const EditName = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);

  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userInfo'));
    if (!userData) {
      navigate('/sign-in');
    } else {
      dispatch(setUserInfo(userData));
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (userInfo) {
      setUserName(userInfo.userName || '');
      setFirstName(userInfo.firstName || '');
      setLastName(userInfo.lastName || '');
    }
  }, [userInfo]);

  const handleSave = async (e) => {
    e.preventDefault();
    const updatedUserInfo = {
      ...userInfo,
      userName,
      firstName,
      lastName,
    };

    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updatedUserInfo),
      });

      if (!response.ok) {
        throw new Error('Ошибка при обновлении информации о пользователе');
      }

      const data = await response.json();
      dispatch(updateName(data)); 
      localStorage.setItem('userInfo', JSON.stringify(data)); 

      alert("Данные успешно сохранены!");
      navigate('/user');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCancel = () => {
    navigate('/user');
  };

  return (
    <div>
      <nav className="main-nav">
        <a className="main-nav-logo" href="/">
          <img className="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div>
          <UserInfo /> {/* Компонент для отображения информации о пользователе и кнопки выхода */}
        </div>
      </nav>
      <main className="main bg-dark">
        <div className="header">
          <h1>Edit user info</h1>
        </div>
        <section className="edit-name-content">
          <form onSubmit={handleSave}>
            <div className="input-wrapper">
              <label htmlFor="userName">User Name</label>
              <input
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <button type="submit" className="save-button">Save</button>
            <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
          </form>
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
};

export default EditName;







