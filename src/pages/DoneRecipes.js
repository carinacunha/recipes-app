import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import CardDoneRecipe from '../components/CardDoneRecipe';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    const done = JSON.parse(localStorage.getItem('doneRecipes'));
    if (done === null) setDoneRecipes([]);
    else setDoneRecipes(done);
  }, []);

  const filterByType = ({ target }) => {
    if (target.name === 'meal') {
      const done = JSON.parse(localStorage.getItem('doneRecipes'));
      const filterMeals = done.filter((elem) => elem.type === target.name);
      setDoneRecipes(filterMeals);
    }
    if (target.name === 'drink') {
      const done = JSON.parse(localStorage.getItem('doneRecipes'));
      const filterDrinks = done.filter((elem) => elem.type === target.name);
      setDoneRecipes(filterDrinks);
    } else {
      const done = JSON.parse(localStorage.getItem('doneRecipes'));
      setDoneRecipes(done);
    }
  };

  console.log(doneRecipes);

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
