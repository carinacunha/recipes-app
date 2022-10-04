import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import loginThumb2 from '../images/loginThumb2.png';
import '../css/Login.css';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  useEffect(() => {
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const passwordRegex = /^.{7,}$/;
    const emailTest = emailRegex.test(email);
    const passwordTest = passwordRegex.test(password);
    setIsEmailValid(emailTest);
    setIsPasswordValid(passwordTest);
  }, [email, password]);

  useEffect(() => {
    if (isEmailValid && isPasswordValid) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [isEmailValid, isPasswordValid]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { history } = props;
    const user = { email };
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('drinksToken', 1);
    localStorage.setItem('doneRecipes', JSON.stringify([]));
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      drinks: {},
      meals: {},
    }));
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    history.push('/meals');
  };

  return (
    <motion.section
      className="login-screen"
      initial={ { opacity: 0 } }
      animate={ { opacity: 1 } }
      exit={ { opacity: 0 } }
    >
      <section>
        <img src={ loginThumb2 } alt="meals and wine" />
      </section>
      <form className="login-form" onSubmit={ handleSubmit }>
        <input
          type="email"
          id="email"
          name="email"
          data-testid="email-input"
          placeholder="Email"
          onChange={ ({ target }) => setEmail(target.value) }
        />
        <input
          type="password"
          id="password"
          name="password"
          data-testid="password-input"
          placeholder="Senha"
          onChange={ ({ target }) => setPassword(target.value) }
        />
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ disabled }
        >
          Entrar
        </button>
      </form>
    </motion.section>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
