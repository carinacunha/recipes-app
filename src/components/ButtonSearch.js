import React, { useContext } from 'react';
import RecipesAppContext from '../context/RecipesAppContext';
import searchIcon from '../images/searchIcon.svg';

function ButtonSearch() {
  const {
    barVisible,
    setBarVisible,
  } = useContext(RecipesAppContext);

  return (
    <div>
      <input
        data-testid="search-top-btn"
        src={ searchIcon }
        alt="search icon"
        type="image"
        onClick={ () => setBarVisible(!barVisible) }
      />
    </div>
  );
}

export default ButtonSearch;
