import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteButton(props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { id, recipe } = props;

  const handleClick = () => {
    setIsFavorite(!isFavorite);
    if (isFavorite === false) {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (favoriteRecipes) {
        favoriteRecipes.push(recipe);
        localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
      } else {
        localStorage.setItem('favoriteRecipes', JSON.stringify([recipe]));
      }
    } else {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (favoriteRecipes) {
        const newFavoriteRecipes = favoriteRecipes
          .filter((favoriteRecipe) => favoriteRecipe.id !== id);
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
      }
    }
  };

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes) {
      const isFavoriteRecipe = favoriteRecipes.some((r) => r.idMeal === id);
      setIsFavorite(isFavoriteRecipe);
    }
  }, []);

  return (
    <button
      type="button"
      data-testid="favorite-btn"
      onClick={ handleClick }
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
}.isRequired;

export default FavoriteButton;
