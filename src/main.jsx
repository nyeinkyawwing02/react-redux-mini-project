import './index.scss';
import React from 'react';
import App from './App.jsx';
import configureStore from './store';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';

const store = configureStore().store;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer closeOnClick={false} />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
