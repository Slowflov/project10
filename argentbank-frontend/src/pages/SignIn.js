import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../redux/userSlice'; 
import '../css/main.css';
import 'font-awesome/css/font-awesome.min.css';
import argentBankLogo from '../img/argentBankLogo.png';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // Состояние для "Remember me"
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.email) { 
      dispatch(login({ email: userInfo.email })); 
      navigate('/user'); 
    } else {
      // Проверяем, есть ли сохраненные данные
      const savedEmail = localStorage.getItem('savedEmail');
      const savedPassword = localStorage.getItem('savedPassword');
      if (savedEmail) setEmail(savedEmail);
      if (savedPassword) setPassword(savedPassword);
    }
  }, [dispatch, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), 
      });

      const responseData = await response.json();
      console.log('Response from server:', responseData); // Выводим ответ в консоль

      if (!response.ok) {
        throw new Error(responseData.message || 'Неверный email или пароль');
      }

      if (responseData.token) {
        // Сохраняем токен в локальном хранилище
        localStorage.setItem('token', responseData.token);

        // Если выбрана опция "Remember me", сохраняем email и пароль
        if (rememberMe) {
          localStorage.setItem('savedEmail', email);
          localStorage.setItem('savedPassword', password);
        } else {
          localStorage.removeItem('savedEmail');
          localStorage.removeItem('savedPassword');
        }

        // Здесь может быть вызов к API для получения информации о пользователе, если она нужна
        const userResponse = await fetch('http://localhost:3001/api/v1/user/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${responseData.token}`,
          },
        });

        const userData = await userResponse.json();

        if (userResponse.ok) {
          dispatch(login({ email: userData.email, firstName: userData.firstName })); // Используем данные из API
          localStorage.setItem('userInfo', JSON.stringify({ email: userData.email, firstName: userData.firstName }));
          navigate('/user');
        } else {
          throw new Error('Не удалось получить данные пользователя');
        }
      } else {
        throw new Error('Не удалось получить токен');
      }
    } catch (error) {
      setError(error.message); 
    }
  };

  return (
    <div>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img className="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        </div>
      </nav>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
            <div className="input-remember">
              <input 
                type="checkbox" 
                id="remember-me" 
                checked={rememberMe} 
                onChange={() => setRememberMe(!rememberMe)} // Обновляем состояние при изменении
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="sign-in-button">Sign In</button>
          </form>
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
};

export default SignIn;










