import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo.js';
import './styles/Login.css';

const Login = ({ handleLogin }) => {
  const [data, setData] = useState({
    username: '',
    password: '',
    message: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;

    setData({
      ...data,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, password } = data;
    handleLogin(username, password);
  }

  return(
    <div onSubmit={handleSubmit} className="login">
      <Logo title={'CryptoDucks'}/>
      <p className="login__welcome">
        Это приложение содержит конфиденциальную информацию.
        Пожалуйста, войдите или зарегистрируйтесь, чтобы получить доступ к CryptoDucks.
      </p>
      <p className="login__error">
        {data.message}
      </p>
      <form className="login__form">
        <label htmlFor="username">
          Логин:
        </label>
        <input id="username" required name="username" type="text" value={data.username} onChange={handleChange} />
        <label htmlFor="password">
          Пароль:
        </label>
        <input id="password" required name="password" type="password" value={data.password} onChange={handleChange} />
        <div className="login__button-container">
          <button type="submit" className="login__link">Войти</button>
        </div>
      </form>

      <div className="login__signup">
        <p>Ещё не зарегистрированы?</p>
        <Link to="/register" className="signup__link">Зарегистрироваться</Link>
      </div>
    </div>
  )
}

export default Login;
