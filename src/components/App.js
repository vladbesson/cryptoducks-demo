import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import Ducks from './Ducks.js';
import MyProfile from './MyProfile.js';
import ProtectedRoute from './ProtectedRoute';
import * as duckAuth from '../duckAuth.js';
import './styles/App.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    email: ''
  });

  const history = useHistory();

  useEffect(() => {
    tokenCheck();
  }, []);

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');

    if (jwt){
      duckAuth.getContent(jwt).then((res) => {
        if (res.email) {
          setUserData({
            username: res.username,
            email: res.email
          });
          setLoggedIn(true);
          history.push('/ducks');
        }
      });
    }
  }

  const handleRegister = (username, password, email) => {
    duckAuth.register(username, password, email)
      .then(data => {
        if (data.jwt) {
          localStorage.setItem('jwt', data.jwt);
          setUserData({
            username: data.user.username,
            email: data.user.email
          });
          setLoggedIn(true);
          history.push('/ducks');
        }
        console.log(data);
      })
      .catch(err => console.log(err));
  }

  const handleLogin = (username, password) => {
    duckAuth.authorize(username, password)
      .then(data => {
        if (data.jwt) {
          localStorage.setItem('jwt', data.jwt);
          setUserData({
            username: data.user.username,
            email: data.user.email
          });
          setLoggedIn(true);
          history.push('/ducks');
        }
      })
      .catch(err => console.log(err));
  }

  const onSignOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/login');
  }

  return (
    <Switch>
      <ProtectedRoute
        path="/ducks"
        loggedIn={loggedIn}
        component={Ducks}
        onSignOut={onSignOut}
      />
      <ProtectedRoute
        path="/my-profile"
        loggedIn={loggedIn}
        userData={userData}
        component={MyProfile}
        onSignOut={onSignOut}
      />
      <Route path="/login">
        <div className="loginContainer">
          <Login handleLogin={handleLogin} tokenCheck={tokenCheck} />
        </div>
      </Route>
      <Route path="/register">
        <div className="registerContainer">
          <Register handleRegister={handleRegister} />
        </div>
      </Route>
      <Route>
        {loggedIn ? <Redirect to="/ducks" /> : <Redirect to="/login" />}
      </Route>
    </Switch>
  );
}

export default App;
