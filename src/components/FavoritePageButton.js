import React from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoritePageButton(props) {
  const { id, index, setFavoriteRecipes } = props;

  const handleClick = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavoriteRecipes = favoriteRecipes.filter((item) => item.id !== id);
    setFavoriteRecipes(newFavoriteRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
  };

  return (
    <button
      type="button"
      data-testid={ `${index}-horizontal-favorite-btn` }
      onClick={ handleClick }
      label="favorite"
      src={ blackHeartIcon }
    >
      <img
        src={ blackHeartIcon }
        alt="favorite"
      />
    </button>
  );
}

FavoritePageButton.propTypes = {
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

export default FavoritePageButton;
