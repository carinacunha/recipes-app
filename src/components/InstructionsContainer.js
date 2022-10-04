import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import '../css/Recipe.css';

function InstructionsContainer(props) {
  const { recipe } = props;
  return (
    <motion.div
      className="instructions-container"
      initial={ { x: 100 } }
      animate={ { x: 0 } }
      exit={ { x: -100 } }
    >
      <h2 className="instructions-title">Instructions</h2>
      <p data-testid="instructions">{recipe.strInstructions}</p>
    </motion.div>
  );
}

InstructionsContainer.propTypes = {
  recipe: PropTypes.shape(),
}.isRequired;

export default InstructionsContainer;
