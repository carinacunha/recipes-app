import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesAppContext from '../context/RecipesAppContext';
import iconsPesquisarRed from '../images/iconsPesquisarRed.png';

function ButtonSearch() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const {
    barVisible,
    setBarVisible,
  } = useContext(RecipesAppContext);
  const isDisabled = pathname === '/profile'
  || pathname === '/done-recipes'
  || pathname === '/favorite-recipes';

  return (
    <input
      className="search__icon"
      data-testid="search-top-btn"
      src={ iconsPesquisarRed }
      alt="search icon"
      type="image"
      onClick={ () => setBarVisible(!barVisible) }
      disabled={ isDisabled }
    />
  );
}

export default ButtonSearch;
