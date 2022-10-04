import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

import '../css/Footer.css';
import RecipesAppContext from '../context/RecipesAppContext';

function Footer() {
  const { setCurrURL, setSearchAPIcall, setSearchInputValue,
  } = useContext(RecipesAppContext);
  const history = useHistory();
  return (
    <footer data-testid="footer" className="footer-menu">
      <input
        type="image"
        src={ drinkIcon }
        alt="drink button"
        data-testid="drinks-bottom-btn"
        className="footer-btn"
        onClick={ () => {
          history.push('/drinks');
          setCurrURL('');
          setSearchAPIcall([]);
        } }
      />
      <input
        type="image"
        src={ mealIcon }
        alt="meal button"
        className="footer-btn"
        data-testid="meals-bottom-btn"
        onClick={ () => {
          history.push('/meals');
          setCurrURL('');
          setSearchAPIcall([]);
          setSearchInputValue({ Value: '' });
        } }
      />
    </footer>
  );
}

export default Footer;
