// EditName.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUserName, updateUserInfo } from '../redux/userSlice';
import '../css/main.css';
import argentBankLogo from '../img/argentBankLogo.png';
import UserInfo from '../redux/userInfo';

const EditName = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);
  const token = useSelector((state) => state.user.token);

  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    if (userInfo) {
      setUserName(userInfo.userName || '');
      setFirstName(userInfo.firstName || '');
      setLastName(userInfo.lastName || '');
    } else {
      navigate('/sign-in');
    }
  }, [userInfo, navigate]);

  const handleSave = async (e) => {
    e.preventDefault();
    
    try {
      const updatedUserInfo = {
        userName,
        firstName,
        lastName,
      };

      await dispatch(updateUserName({ token, newUserName: userName })).unwrap();

      // Mettre à jour l'état de l'utilisateur
      dispatch(updateUserInfo(updatedUserInfo));

      alert("Les données sont enregistrées avec succès!");
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
          <UserInfo /> 
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
                readOnly 
                className="readonly-input" 
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                readOnly 
                className="readonly-input"
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
