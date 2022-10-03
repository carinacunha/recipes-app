import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ingredientsIcon from '../images/icons8-ingredients-48 (1).png';
import instructionsIcon from '../images/icons8-cooking-book-50 (1).png';
import '../App.css';
import '../styles/RecipeDetails.css';

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
  const { recipe, type, setShow } = props;
  const [renderRecipe, setRenderRecipe] = useState(findByType(type, recipe));

  useEffect(() => {
    setRenderRecipe(findByType(type, recipe));
  }, [props]);

  return (
    renderRecipe.name ? (
      <div className="recipe-header">
        <div className="recipe-header-text">
          <h1 data-testid="recipe-title">{renderRecipe.name}</h1>
          <h3 data-testid="recipe-category">{renderRecipe.category}</h3>
        </div>
        <div className="recipe-header-buttons">
          <input
            type="image"
            src={ ingredientsIcon }
            alt="ingredients"
            className="change-icon"
            onClick={ () => {
              setShow('ingredients');
            } }
          />
          <input
            type="image"
            src={ instructionsIcon }
            alt="instructions"
            className="change-icon"
            onClick={ () => {
              setShow('instructions');
            } }
          />
        </div>

      </div>
    ) : null
  );
}

HeaderRecipe.propTypes = {
  recipe: PropTypes.shape(),
  type: PropTypes.string,
}.isRequired;

export default HeaderRecipe;
