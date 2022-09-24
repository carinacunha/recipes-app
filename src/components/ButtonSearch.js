import React from 'react';
import searchIcon from '../images/searchIcon.svg';

function ButtonSearch() {
  return (
    <div>
      <input
        data-testid="search-top-btn"
        src={ searchIcon }
        alt="search icon"
        type="image"
      />
    </div>
  );
}

export default ButtonSearch;
