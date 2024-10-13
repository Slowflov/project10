import React, { useEffect, useState, useCallback } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/userSlice'; 
import { useNavigate, Link } from 'react-router-dom'; 
import 'font-awesome/css/font-awesome.css';
import '../css/main.css';
import argentBankLogo from '../img/argentBankLogo.png';
import UserInfo from '../redux/userInfo'; // Импортируем компонент UserInfo

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);
  const [errorMessage, setErrorMessage] = useState(null); // Для хранения сообщений об ошибках
  const [transactions, setTransactions] = useState([]); // Для хранения транзакций

  const fetchUserData = useCallback(async () => {
    try {
      const response = await fetch('/api/v1/user'); 
      if (response.ok) { 
        const data = await response.json();
        dispatch(login(data)); 
      } else {
        throw new Error('Received non-JSON response');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setErrorMessage('Failed to fetch user data. Please try again later.');
    }
  }, [dispatch]);

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/transactions'); // Запрос на получение транзакций
      if (response.ok) { 
        const data = await response.json();
        setTransactions(data); // Сохранение полученных транзакций
      } else {
        throw new Error('Received non-JSON response');
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setErrorMessage('Failed to fetch transactions. Please try again later.');
    }
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userInfo'));
    if (!userData) {
      fetchUserData();
    } else {
      dispatch(login(userData));
    }
    fetchTransactions(); // Запрос на получение транзакций при монтировании компонента
  }, [dispatch, fetchUserData, fetchTransactions]);

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
          <UserInfo /> {/* Используем компонент UserInfo для отображения информации о пользователе */}
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
            <button className="transaction-button">View transactions</button>
          </div>
        </section>

        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>

        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>

        {/* Отображение транзакций */}
        <section className="transactions">
          <h2>Your Transactions</h2>
          <ul>
            {transactions.map(transaction => (
              <li key={transaction.id}>
                {transaction.account}: {transaction.amount} on {transaction.date}
              </li>
            ))}
          </ul>
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
};

export default UserProfile; 









