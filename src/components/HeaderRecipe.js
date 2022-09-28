import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../App.css';

function findByType(type, recipe) {
  if (type === 'meals') {
    return {
      name: recipe.strMeal,
      category: recipe.strCategory,
      img: recipe.strMealThumb,
    };
  }
  return {
    name: recipe.strDrink,
    category: recipe.strAlcoholic,
    img: recipe.strDrinkThumb,
  };
}

function HeaderRecipe(props) {
  const { recipe, type } = props;
  const [renderRecipe, setRenderRecipe] = useState(findByType(type, recipe));

  useEffect(() => {
    setRenderRecipe(findByType(type, recipe));
  }, [props]);

  return (
    renderRecipe.name ? (
      <div>
        <img
          src={ renderRecipe.img }
          alt={ renderRecipe.name }
          data-testid="recipe-photo"
          className="recipe-img"
        />
        <h1 data-testid="recipe-title">{renderRecipe.name}</h1>
        <h2 data-testid="recipe-category">{renderRecipe.category}</h2>
      </div>
    ) : <p>Carregando...</p>
  );
}

HeaderRecipe.propTypes = {
  recipe: PropTypes.shape(),
  type: PropTypes.string,
}.isRequired;

export default HeaderRecipe;
