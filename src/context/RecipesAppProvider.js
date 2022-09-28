/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesAppContext from './RecipesAppContext';

function RecipesAppProvider({ children }) {
  const [searchAPIcall, setSearchAPIcall] = useState([]);
  const [currURL, setCurrURL] = useState('');
  const [searchInputValue, setSearchInputValue] = useState({ Value: '' });
  const [searchRadio, setSearchRadio] = useState({ Value: '' });

  const handleInputBar = ({ target: { name, value } }) => {
    setSearchInputValue(() => (
      {
        [name]: value,
      }
    ));
  };

  const handleInputRadio = ({ target: { value } }) => {
    setSearchRadio(() => (
      {
        value: [value].toString(),
      }
    ));
  };
  const context = {
    searchInputValue,
    searchRadio,
    handleInputBar,
    handleInputRadio,
    setSearchAPIcall,
    searchAPIcall,
    setSearchInputValue,
    currURL,
    setCurrURL,
  };

  return (
    <RecipesAppContext.Provider value={ context }>
      {children}
    </RecipesAppContext.Provider>
  );
}

RecipesAppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesAppProvider;
