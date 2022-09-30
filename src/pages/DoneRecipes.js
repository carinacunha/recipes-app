import React, { useState } from 'react';
import Header from '../components/Header';
import CardDoneRecipe from '../components/CardDoneRecipe';

const done = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState(done);

  const filterByType = ({ target }) => {
    if (target.name === 'meal') {
      const filterMeals = done.filter((elem) => elem.type === target.name);
      setDoneRecipes(filterMeals);
      return;
    }
    if (target.name === 'drink') {
      const filterDrinks = done.filter((elem) => elem.type === target.name);
      setDoneRecipes(filterDrinks);
      return;
    } setDoneRecipes(done);
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
        doneRecipes.map((recipe, index) => (
          <CardDoneRecipe recipe={ recipe } key={ index } index={ index } />))
      }
    </div>
  );
}

export default DoneRecipes;
