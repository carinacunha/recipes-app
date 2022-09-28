import React from 'react';
import PropTypes from 'prop-types';

function InstructionsContainer(props) {
  const { recipe } = props;
  return (
    <div>
      <h2>Instructions</h2>
      <p data-testid="instructions">{recipe.strInstructions}</p>
    </div>
  );
}

InstructionsContainer.propTypes = {
  recipe: PropTypes.shape(),
}.isRequired;

export default InstructionsContainer;
