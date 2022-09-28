/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesAppContext from '../context/RecipesAppContext';
import fetchApi from '../services/fetchApi';

export default function SearchBar() {
  const {
    handleInputRadio, searchRadio, searchInputValue, searchAPIcall,
    setSearchAPIcall, setSearchInputValue, setCurrURL,
  } = useContext(RecipesAppContext);

  const { location: { pathname } } = useHistory();
  const { push } = useHistory();

  let URL;

  const inputValue = searchInputValue.Value;

  const checkPath = () => {
    if (pathname === '/drinks') return 'thecocktaildb';
    if (pathname === '/meals') return 'themealdb';
  };

  useEffect(() => {
    if (pathname === '/meals'
    && searchAPIcall.meals?.length === 1) {
      push(`/meals/${searchAPIcall.meals[0].idMeal}`);
    }
    if (pathname === '/drinks'
    && searchAPIcall.drinks?.length === 1) {
      push(`/drinks/${searchAPIcall.drinks[0].idDrink}`);
    }
    const handleAlert = async () => {
      if (pathname === '/meals'
      && await searchAPIcall.meals === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
        setCurrURL('');
      }
      if (pathname === '/drinks'
      && await searchAPIcall.drinks === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
        setCurrURL('');
      }
      setSearchInputValue({ Value: '' });
    };
    handleAlert();
  }, [searchAPIcall]);

  const verifyRadiosMeals = () => {
    switch (searchRadio.value) {
    case 'ingredient':
      if (inputValue.length > 0) URL = `https://www.${checkPath()}.com/api/json/v1/1/filter.php?i=${searchInputValue.Value}`;
      break;
    case 'name':
      if (inputValue.length > 0) URL = `https://www.${checkPath()}.com/api/json/v1/1/search.php?s=${searchInputValue.Value}`;
      break;
    case 'first letter':
      if (inputValue.length === 1) URL = `https://www.${checkPath()}.com/api/json/v1/1/search.php?f=${searchInputValue.Value}`;
      if (inputValue.length > 1) {
        setSearchInputValue({ Value: '' });
        return global.alert('Your search must have only 1 (one) character');
      }
      break;
    default:
      return URL;
    }
    setSearchInputValue({ Value: '' });
  };

  verifyRadiosMeals();

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
          onClick={ async () => {
            setSearchAPIcall(await fetchApi(URL));
            setCurrURL(URL);
          } }
        >
          search
        </button>
      </form>
    </div>
  );
}
