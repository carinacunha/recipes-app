import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../css/Recipe.css';

function findByType(type, recipe) {
  if (type === 'meals') {
    return {
      img: recipe.strMealThumb,
    };
  }
  return {
    img: recipe.strDrinkThumb,
  };
}

function RecipeImage(props) {
  const { type, recipe } = props;
  const [renderRecipe, setRenderRecipe] = useState(findByType(type, recipe));

  useEffect(() => {
    setRenderRecipe(findByType(type, recipe));
  }, [props]);

  return (
    <img
      src={ renderRecipe.img }
      alt={ renderRecipe.name }
      data-testid="recipe-photo"
      className="recipe-img"
    />
  );
}

RecipeImage.propTypes = {
  recipe: PropTypes.shape(),
  type: PropTypes.string,
}.isRequired;

export default RecipeImage;
