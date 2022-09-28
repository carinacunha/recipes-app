import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function IngredientsCheckboxContainer(props) {
  const { recipe } = props;
  const [renderIngredients, setRenderIngredients] = useState({});

  useEffect(() => {
    const keys = Object.keys(recipe);
    const ingredients = keys.filter((key) => key.includes('Ingredient'));
    const measures = keys.filter((key) => key.includes('Measure'));
    const ingredientsAndMeasures = [];
    ingredients.forEach((ingredient, i) => {
      if (recipe[ingredients[i]] !== '' && recipe[ingredients[i]] !== null) {
        if (recipe[measures[i]] !== '' && recipe[measures[i]] !== null) {
          ingredientsAndMeasures
            .push(`${recipe[ingredients[i]]} - ${recipe[measures[i]]}`);
        } else {
          ingredientsAndMeasures.push(recipe[ingredients[i]]);
        }
      }
    });
    setRenderIngredients(ingredientsAndMeasures);
  }, [props]);

  return (
    renderIngredients.length > 0 ? renderIngredients.map((ingredient, i) => (
      <label
        key={ i }
        htmlFor={ ingredient }
        data-testid={ `data-testid=${i}-ingredient-step` }
      >
        <input type="checkbox" id={ ingredient } />
        {ingredient}
      </label>
    )) : <p>Carregando...</p>
  );
}

IngredientsCheckboxContainer.propTypes = {
  recipe: PropTypes.shape(),
}.isRequired;

export default IngredientsCheckboxContainer;
