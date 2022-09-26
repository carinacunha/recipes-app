import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesAppContext from '../context/RecipesAppContext';
import fetchApi from '../services/fetchApi';

export default function SearchBar() {
  const {
    handleInputRadio, searchRadio, searchInputValue,
  } = useContext(RecipesAppContext);

  const { location: { pathname } } = useHistory();

  let URL;

  const inputValue = searchInputValue.Value;

  const verifyRadiosMeals = () => {
    switch (searchRadio.value) {
    case 'ingredient':
      if (inputValue.length > 0) URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputValue.Value}`;
      break;
    case 'name':
      if (inputValue.length > 0) URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputValue.Value}`;
      break;
    case 'first letter':
      if (inputValue.length === 1) URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInputValue.Value}`;
      if (inputValue.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      break;
    default:
      return URL;
    }
  };

  const verifyRadiosDrinks = () => {
    switch (searchRadio.value) {
    case 'ingredient':
      if (inputValue.length > 0) URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInputValue.Value}`;
      break;
    case 'name':
      if (inputValue.length > 0) URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInputValue.Value}`;
      break;
    case 'first letter':
      if (inputValue.length === 1) URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInputValue.Value}`;
      if (inputValue.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      break;
    default:
      return URL;
    }
  };

  const checkPath = () => {
    if (pathname === '/drinks') verifyRadiosDrinks();
    if (pathname === '/meals') verifyRadiosMeals();
  };

  checkPath();

  return (
    <div>
      <form>
        <input
          type="radio"
          name="search"
          value="ingredient"
          data-testid="ingredient-search-radio"
          onChange={ handleInputRadio }
        />
        Ingredient
        <input
          type="radio"
          name="search"
          value="name"
          data-testid="name-search-radio"
          onChange={ handleInputRadio }
        />
        Name
        <input
          type="radio"
          name="search"
          value="first letter"
          data-testid="first-letter-search-radio"
          onChange={ handleInputRadio }
        />
        First Letter
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ async () => { await fetchApi(URL); } }
        >
          search
        </button>
      </form>
    </div>
  );
}
