// UserProfile.js
import React, { useEffect, useState, useCallback } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, logout } from '../redux/userSlice'; 
import { useNavigate, Link } from 'react-router-dom';  
import 'font-awesome/css/font-awesome.css';
import '../css/main.css';
import argentBankLogo from '../img/argentBankLogo.png';
import UserInfo from '../redux/userInfo'; 

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);
  const token = useSelector((state) => state.user.token); 
  const [errorMessage, setErrorMessage] = useState(null); 

  const fetchUserData = useCallback(async () => {
    if (!token) {
      dispatch(logout()); 
      return;
    }

    try {
      await dispatch(getUserInfo(token)).unwrap(); 
    } catch (error) {
      console.error('Error fetching user data:', error);
      setErrorMessage('Failed to fetch user data. Please try again later.');
      dispatch(logout()); 
    }
  }, [dispatch, token]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <div>
      <nav className="main-nav">
        <button className="main-nav-logo" onClick={() => navigate('/')}>
          <img
            className="main-nav-logo-image"
            src={argentBankLogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </button>
        <div>
          <UserInfo /> 
        </div>
      </nav>
      <main className="main bg-dark">
        <div className="header">
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <h1>Welcome back<br />{userInfo?.email || 'User'}</h1>
          <Link to="/edit-name" className="edit-button">Edit Name</Link>
        </div>
        <h2 className="sr-only">Accounts</h2>

        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
          <button className="transaction-button" onClick={() => navigate('/transactions')}>
  View transactions
</button>

          </div>
        </section>

        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
          <button className="transaction-button" onClick={() => navigate('/transactions')}>
  View transactions
</button>

          </div>
        </section>

        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
          <button className="transaction-button" onClick={() => navigate('/transactions')}>
  View transactions
</button>

          </div>
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
};

export default UserProfile;
















