import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import CardFavoriteRecipe from '../components/CardFavoriteRecipe';
import '../css/Favorites.css';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState();

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
    } else {
      const localFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setFavoriteRecipes(localFavorites);
    }
  };

  return (
    <div>
      <Header />
      <motion.section
        className="Filters-Favorites"
        initial={ { opacity: 0 } }
        animate={ { opacity: 1 } }
        exit={ { opacity: 0 } }
      >
        <legend>
          <input
            className="Filter-all"
            data-testid="filter-by-all-btn"
            name="all"
            type="button"
            alt="button"
            onClick={ filterByType }
          />
          <p>All</p>
        </legend>
        <legend>
          <input
            className="Filter-meal"
            data-testid="filter-by-meal-btn"
            name="meal"
            type="button"
            alt="button"
            onClick={ filterByType }
          />
          <p>Meals</p>
        </legend>
        <legend>
          <input
            className="Filter-drink"
            data-testid="filter-by-drink-btn"
            name="drink"
            type="button"
            alt="button"
            onClick={ filterByType }
          />
          <p>Drinks</p>
        </legend>
      </motion.section>
      <section className="Card-Favorite">
        {
          favoriteRecipes?.map((recipe, index) => (
            <CardFavoriteRecipe
              recipe={ recipe }
              key={ index }
              index={ index }
              setFavoriteRecipes={ setFavoriteRecipes }
            />))
        }
      </section>
    </div>
  );
}

export default FavoriteRecipes;
