import React, { useContext, useState } from 'react';
import RecipesAppContext from '../context/RecipesAppContext';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function ButtonSearch() {
  const [barVisible, setBarVisible] = useState(false);
  const { handleInputBar, searchInputValue } = useContext(RecipesAppContext);
  return (
    <div>
      <input
        data-testid="search-top-btn"
        src={ searchIcon }
        alt="search icon"
        type="image"
        onClick={ () => setBarVisible(!barVisible) }
      />

      {barVisible
      && (
        <div>
          <input
            name="Value"
            data-testid="search-input"
            type="text"
            value={ searchInputValue.Value }
            onChange={ handleInputBar }
            placeholder="digite a receita"
          />
          <SearchBar />
        </div>
      )}

    </div>
  );
}

export default ButtonSearch;
