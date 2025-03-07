import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import * as serviceWorkerRegistration from './serviceWorkerRegistration.js';
import reportWebVitals from './reportWebVitals.js';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from './store.js'




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
<Provider store={store}>
<BrowserRouter>
    <App />
</BrowserRouter>
</Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
