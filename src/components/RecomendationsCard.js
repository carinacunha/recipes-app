import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecomendedDrinks from './RecomendedDrinks';
import RecomendedMeals from './RecomendedMeals';

import '../App.css';

const SIX = 6;
const HALF = 0.5;

function RecomendationsCard(props) {
  const [recomendation, setRecomendation] = useState();
  const { type, id } = props;
  const urlType = type === 'meals' ? 'thecocktaildb' : 'themealdb';
  const url = `https://www.${urlType}.com/api/json/v1/1/search.php?s=`;

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(url);
      const data = await response.json();
      if (type === 'meals') {
        setRecomendation(data.drinks
          .filter((drink) => drink.idDrink !== id)
          .filter((e, i) => i < SIX))
          .sort(() => Math.random() - HALF);
      } else {
        setRecomendation(data.meals
          .filter((meal) => meal.idMeal !== id)
          .filter((e, i) => i < SIX))
          .sort(() => Math.random() - HALF);
      }
    };
    fetchRecipe();
  }, []);

  return (
    <div className="live__scroll">
      {type === 'meals'
        ? <RecomendedDrinks recomendation={ recomendation } />
        : <RecomendedMeals recomendation={ recomendation } />}
    </div>
  );
}

RecomendationsCard.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default RecomendationsCard;
