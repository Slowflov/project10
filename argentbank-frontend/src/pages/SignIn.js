import React, { useState, useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'; 
import { loginAsync, setRememberMe, setSavedCredentials } from '../redux/userSlice'; 
import '../css/main.css';
import 'font-awesome/css/font-awesome.min.css';
import argentBankLogo from '../img/argentBankLogo.png';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Obtient les données sauvegardées depuis Redux
  const savedEmail = useSelector((state) => state.user.savedEmail);
  const savedPassword = useSelector((state) => state.user.savedPassword);
  const rememberMe = useSelector((state) => state.user.rememberMe);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  

  // Remplit les champs si rememberMe est activé et que les données sauvegardées ne sont pas vides
  useEffect(() => {
    if (rememberMe) {
      setEmail(savedEmail);
      setPassword(savedPassword);
    }
  }, [rememberMe, savedEmail, savedPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const result = await dispatch(loginAsync({ email, password })).unwrap();
      console.log("Authentification réussie, résultat :", result);
  
      if (result && result.token) {
        // Si rememberMe est activé, sauvegarde les données saisies dans Redux
        if (rememberMe) {
          dispatch(setSavedCredentials({ email, password }));
        }
        navigate('/user', { replace: true });
      } else {
        throw new Error('Token non reçu');
      }
    } catch (error) {
      console.error("Erreur d'authentification :", error);
      setError('Email ou mot de passe incorrect');
    }
  };

  const handleRememberMeChange = () => {
    // Change l'état de rememberMe
    const newRememberMe = !rememberMe;
    dispatch(setRememberMe(newRememberMe));
    
    // Sauvegarde les données seulement si la case est cochée
    if (newRememberMe) {
      dispatch(setSavedCredentials({ email, password }));
    } else {
      // Si la case est décochée, efface les données sauvegardées
      dispatch(setSavedCredentials({ email: '', password: '' }));
    }
  };
  
  return (
    <div>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img className="main-nav-logo-image" src={argentBankLogo} alt="Logo Argent Bank" />
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
                onChange={handleRememberMeChange} 
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














