import React, { useContext } from 'react';
import RecipesAppContext from '../context/RecipesAppContext';
import iconsPesquisarRed from '../images/iconsPesquisarRed.png';

function ButtonSearch() {
  const {
    barVisible,
    setBarVisible,
  } = useContext(RecipesAppContext);

  return (
    <input
      className="search__icon"
      data-testid="search-top-btn"
      src={ iconsPesquisarRed }
      alt="search icon"
      type="image"
      onClick={ () => setBarVisible(!barVisible) }
    />
  );
}

export default ButtonSearch;
