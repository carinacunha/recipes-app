import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import CardDoneRecipe from '../components/CardDoneRecipe';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(local);
  }, []);

  const filterByType = ({ target }) => {
    if (target.name === 'meal') {
      const localDone = JSON.parse(localStorage.getItem('doneRecipes'));
      const filterMeals = localDone.filter((elem) => elem.type === target.name);
      setDoneRecipes(filterMeals);
    } else if (target.name === 'drink') {
      const localDone = JSON.parse(localStorage.getItem('doneRecipes'));
      const filterDrinks = localDone.filter((elem) => elem.type === target.name);
      setDoneRecipes(filterDrinks);
    } else {
      const localDone = JSON.parse(localStorage.getItem('doneRecipes'));
      setDoneRecipes(localDone);
    }
  };

  return (
    <div>
      <Header />
      <button
        data-testid="filter-by-all-btn"
        name="all"
        type="button"
        onClick={ filterByType }
      >
        All
      </button>

      <button
        data-testid="filter-by-meal-btn"
        name="meal"
        type="button"
        onClick={ filterByType }
      >
        Meals
      </button>

      <button
        data-testid="filter-by-drink-btn"
        name="drink"
        type="button"
        onClick={ filterByType }
      >
        Drinks
      </button>

      {
        doneRecipes?.map((recipe, index) => (
          <CardDoneRecipe recipe={ recipe } key={ index } index={ index } />))
      }
    </div>
  );
}

export default DoneRecipes;
