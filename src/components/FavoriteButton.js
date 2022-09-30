import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteButton(props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { id, recipe, type, setFavoriteRecipes } = props;

  let types = '';
  if (type === 'meals') {
    types = 'meal';
  } else {
    types = 'drink';
  }

  const localRecipe = {
    alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
    category: recipe.strCategory ? recipe.strCategory : '',
    id: recipe.idMeal ? recipe.idMeal : recipe.idDrink,
    image: recipe.strMealThumb ? recipe.strMealThumb : recipe.strDrinkThumb,
    name: recipe.strMeal ? recipe.strMeal : recipe.strDrink,
    nationality: recipe.strArea ? recipe.strArea : '',
    type: types,
  };

  const handleClick = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (favoriteRecipes) {
        const newFavoriteRecipes = [...favoriteRecipes, localRecipe];
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
      } else {
        localStorage.setItem('favoriteRecipes', JSON.stringify([localRecipe]));
      }
    } else {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const newFavoriteRecipes = favoriteRecipes.filter((item) => item.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
      if (setFavoriteRecipes) {
        setFavoriteRecipes(newFavoriteRecipes);
      }
    }
  };

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes) {
      const isFavoriteRecipe = favoriteRecipes.some((r) => r.id === id);
      setIsFavorite(isFavoriteRecipe);
    }
  }, []);

  return (
    <button
      type="button"
      data-testid="favorite-btn"
      onClick={ handleClick }
      label="favorite"
      src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
    >
      <img
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="favorite"
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  id: PropTypes.string,
  recipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string,
    strCategory: PropTypes.string,
    idMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strArea: PropTypes.string,
  }),
  type: PropTypes.string,
}.isRequired;

export default FavoriteButton;
