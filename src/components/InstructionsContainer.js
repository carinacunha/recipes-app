import React from 'react';
import PropTypes from 'prop-types';
import '../css/Recipe.css';

function InstructionsContainer(props) {
  const { recipe } = props;
  return (
    <div className="instructions-container">
      <h2 className="instructions-title">Instructions</h2>
      <p data-testid="instructions">{recipe.strInstructions}</p>
    </div>
  );
}

InstructionsContainer.propTypes = {
  recipe: PropTypes.shape(),
}.isRequired;

export default InstructionsContainer;
