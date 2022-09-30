import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import renderingIngredients from '../services/renderingIgredients';

function FinishRecipeButton(props) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const { recipe, usedIngredients, history, id, type } = props;

  useEffect(() => {
    renderingIngredients(recipe, setIngredients);
  }, [recipe]);

  useEffect(() => {
    if (ingredients.length === usedIngredients.length) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [usedIngredients]);

  const handleClick = () => {
    const toLocal = {
      alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
      category: recipe.strCategory,
      id,
      image: recipe.strMealThumb ? recipe.strMealThumb : recipe.strDrinkThumb,
      name: recipe.strMeal ? recipe.strMeal : recipe.strDrink,
      nationality: recipe.strArea ? recipe.strArea : '',
      type,
      doneDate: new Date(),
      tags: recipe.strTags ? recipe.strTags : [],
    };
    const localDones = JSON.parse(localStorage.getItem('doneRecipes'));
    if (localDones) {
      const newDoneRecipes = [...localDones, toLocal];
      localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([toLocal]));
    }
    history.push('/done-recipes');
  };

  return (
    <div>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ isDisabled }
        onClick={ handleClick }
      >
        Finish Recipe
      </button>
    </div>
  );
}

FinishRecipeButton.propTypes = {
  recipe: PropTypes.shape({
    strDrink: PropTypes.string,
    strMeal: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strCategory: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strArea: PropTypes.string,
    strTags: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  usedIngredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default FinishRecipeButton;
