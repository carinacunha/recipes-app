import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../css/Recipe.css';

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  return (
    renderIngredients.length > 0
      ? (
        <div className="ingredients-container">
          <h2 className="instructions-title">Ingredients</h2>
          {renderIngredients.map((ingredient, i) => (
            <li
              key={ i }
              data-testid={ `${i}-ingredient-name-and-measure` }
            >
              {ingredient}
            </li>
          ))}
        </div>)
      : null
  );
}

IngredientsContainer.propTypes = {
  recipe: PropTypes.shape(),
}.isRequired;

export default IngredientsContainer;
