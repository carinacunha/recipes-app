import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function IngredientsContainer(props) {
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
      <li
        key={ i }
        data-testid={ `${i}-ingredient-name-and-measure` }
      >
        {ingredient}
      </li>
    )) : <p>Carregando...</p>
  );
}

IngredientsContainer.propTypes = {
  recipe: PropTypes.shape(),
}.isRequired;

export default IngredientsContainer;
