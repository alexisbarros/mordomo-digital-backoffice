import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { initializeApp } from 'firebase/app';

// Components
import Login from './Components/Login/LoginContainer';
import Home from './Components/Home/HomeContainer';
import VerifyUser from './Components/VerifyUser/VerifyUserContainer';
import PrivacyPolicy from './Components/PrivacyPolicy/PrivacyPolicyContainer';
import RecoverPass from './Components/RecoverPass/RecoverPassContainer';
import Premium from './Components/Premium/PremiumContainer';
import ListToPrint from './Components/Users/ListToPrint/ListToPrint';

window.auth = (Component, props) => {
  let token = sessionStorage.getItem('access_token') || localStorage.getItem('access_token') || '';
  try {
    jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
    return <Component {...props} />
  } catch (err) {
    return <Login {...props} />
  }
}

initializeApp({
  "apiKey": process.env.REACT_APP_FIREBASE_APIKEY,
  "authDomain": process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  // "databaseURL": process.env.REACT_APP_FIREBASE_DATABASEURL,
  "projectId": process.env.REACT_APP_FIREBASE_PROJECTID,
  "storageBucket": process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  "messagingSenderId": process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  "appId": process.env.REACT_APP_FIREBASE_APPID,
  // "measurementId": process.env.REACT_APP_FIREBASE_MEASUREMENTID
});

ReactDOM.render(

  <React.StrictMode>

    <BrowserRouter>

      <Switch>

        <Route path='/' exact render={(props) => window.auth(Home, props)} />
        <Route path='/home' render={(props) => window.auth(Home, props)} />
        <Route path='/authorize-user' component={VerifyUser} />
        <Route path='/privacy-policy' component={PrivacyPolicy} />
        <Route path='/recover-pass' component={RecoverPass} />
        <Route path='/premium' component={Premium} />

        <Route path='/print-user-list' component={ListToPrint} />

      </Switch>

    </BrowserRouter>

  </React.StrictMode>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
