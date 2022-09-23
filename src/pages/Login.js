import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

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
    history.push('/meals');
  };

  return ( 
    <div>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            name="email"
            data-testid="email-input"
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            id="password"
            name="password"
            data-testid="password-input"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ disabled }
        >
          Entrar
        </button>
      </form>
    </div>
   );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
