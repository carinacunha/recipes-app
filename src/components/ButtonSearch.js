import React, { useState } from 'react';
import searchIcon from '../images/searchIcon.svg';

function ButtonSearch() {
  const [barVisible, setBarVisible] = useState(false);
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
      && <input
        data-testid="search-input"
        type="text"
        placeholder="digite a receita"
      />}

    </div>
  );
}

export default ButtonSearch;
