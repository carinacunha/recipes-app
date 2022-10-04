/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesAppContext from '../context/RecipesAppContext';
import fetchApi from '../services/fetchApi';
import '../css/SearchBar.css';

export default function SearchBar() {
  const {
    handleInputRadio, searchRadio, searchInputValue, searchAPIcall,
    setSearchAPIcall, setCurrURL, setSearchInputValue, handleInputBar,
  } = useContext(RecipesAppContext);

  let URL;

  const { location: { pathname } } = useHistory();
  const { push } = useHistory();

  const handleAlert = () => {
    const path = pathname === '/meals' ? 'meals' : 'drinks';
    if (searchAPIcall?.[path] === null) {
      console.log('cheguei');
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      setCurrURL('');
      setSearchInputValue({ Value: '' });
    }
  };

  useEffect(() => {
    if (pathname === '/meals'
    && searchAPIcall.meals?.length === 1) {
      push(`/meals/${searchAPIcall?.meals[0].idMeal}`);
    }
    if (pathname === '/drinks'
    && searchAPIcall.drinks?.length === 1) {
      push(`/drinks/${searchAPIcall?.drinks[0].idDrink}`);
    }
    handleAlert();
  }, [searchAPIcall]);

  const verifyRadiosMeals = () => {
    const inputValue = searchInputValue.Value;

    const checkPath = pathname === '/drinks' ? 'thecocktaildb' : 'themealdb';

    switch (searchRadio.value) {
    case 'ingredient':
      if (inputValue?.length > 0) URL = `https://www.${checkPath}.com/api/json/v1/1/filter.php?i=${searchInputValue.Value}`;
      break;
    case 'name':
      if (inputValue?.length > 0) URL = `https://www.${checkPath}.com/api/json/v1/1/search.php?s=${searchInputValue.Value}`;
      break;
    case 'first letter':
      if (inputValue?.length === 1) URL = `https://www.${checkPath}.com/api/json/v1/1/search.php?f=${searchInputValue.Value}`;
      if (inputValue?.length > 1) {
        setSearchInputValue({ Value: '' });
        return global.alert('Your search must have only 1 (one) character');
      }
      break;
    default:
      return URL;
    }
  };

  verifyRadiosMeals();

  return (
    <form className="search__bar">
      <input
        name="Value"
        data-testid="search-input"
        type="text"
        value={ searchInputValue.Value }
        onChange={ handleInputBar }
        placeholder="Pesquise por ingredientes ou nome da receita"
      />
      <section className="search__radios">
        <label htmlFor="igredient">
          <input
            id="igredient"
            type="radio"
            name="search"
            value="ingredient"
            data-testid="ingredient-search-radio"
            onChange={ handleInputRadio }
          />
          Ingredient
        </label>
        <label htmlFor="name">
          <input
            id="name"
            type="radio"
            name="search"
            value="name"
            data-testid="name-search-radio"
            onChange={ handleInputRadio }
          />
          Name
        </label>
        <label htmlFor="letter">
          <input
            id="letter"
            type="radio"
            name="search"
            value="first letter"
            data-testid="first-letter-search-radio"
            onChange={ handleInputRadio }
          />
          First Letter
        </label>
      </section>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ async () => {
          setSearchAPIcall(await fetchApi(URL));
          setCurrURL(URL);
          setSearchInputValue({ Value: '' });
        } }
      >
        Search
      </button>
    </form>
  );
}
