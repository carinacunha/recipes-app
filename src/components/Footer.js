import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

import '../App.css';

function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer" className="footer-menu">
      <input
        type="image"
        src={ drinkIcon }
        alt="drink button"
        data-testid="drinks-bottom-btn"
        onClick={ () => { history.push('/drinks'); } }
      />
      <input
        type="image"
        src={ mealIcon }
        alt="meal button"
        data-testid="meals-bottom-btn"
        onClick={ () => { history.push('/meals'); } }
      />
    </footer>
  );
}

export default Footer;
