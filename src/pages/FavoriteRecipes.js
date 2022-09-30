import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import CardFavoriteRecipe from '../components/CardFavoriteRecipe';

function FavoriteRecipes(props) {
  const [favoriteRecipes, setFavoriteRecipes] = useState();
  const { history } = props;

  useEffect(() => {
    const getFavoriteStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(getFavoriteStorage);
  }, []);

  const filterByType = ({ target }) => {
    if (target.name === 'meal') {
      const localFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const filterMeals = localFavorites.filter((elem) => elem.type === target.name);
      setFavoriteRecipes(filterMeals);
    } else if (target.name === 'drink') {
      const localFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const filterDrinks = localFavorites.filter((elem) => elem.type === target.name);
      setFavoriteRecipes(filterDrinks);
    } else if (target.name === 'all') {
      const localFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setFavoriteRecipes(localFavorites);
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

      <button
        name="back"
        type="button"
        onClick={ () => history.push('/meals') }
      >
        Go Home
      </button>

      {
        favoriteRecipes?.map((recipe, index) => (
          <CardFavoriteRecipe
            recipe={ recipe }
            key={ index }
            index={ index }
            setFavoriteRecipes={ setFavoriteRecipes }
          />))
      }
    </div>
  );
}

FavoriteRecipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default FavoriteRecipes;
