import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Импортируй стили
import App from './App'; // Импортируй главный компонент приложения
import reportWebVitals from './reportWebVitals'; // Для измерения производительности
import { Provider } from 'react-redux'; // Для интеграции Redux
import { PersistGate } from 'redux-persist/integration/react'; // Для интеграции redux-persist
import { store, persistor } from './redux/store'; // Импортируй хранилище Redux и persistor

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

reportWebVitals(); // Отслеживание производительности






