import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import renderingIngredients from '../services/renderingIgredients';
import { useLocalStorageNonString } from '../hooks/index';

const onChange = ({ target }, ingredient, setUsedIngredients, typeThe) => {
  const { type, id, setInProgress } = typeThe;
  const oldLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (target.checked) {
    if (oldLocal[type][id]) {
      oldLocal[type][id] = [...oldLocal[type][id], ingredient];
      setInProgress(oldLocal);
      setUsedIngredients(oldLocal[type][id]);
    } else {
      oldLocal[type][id] = [ingredient];
      setInProgress(oldLocal);
      setUsedIngredients(oldLocal[type][id]);
    }
  } else {
    const newLocal = oldLocal[type][id].filter((i) => i !== ingredient);
    oldLocal[type][id] = newLocal;
    setInProgress(oldLocal);
    setUsedIngredients(oldLocal[type][id]);
  }
};

function IngredientsCheckboxContainer(props) {
  const { recipe, type, id, usedIngredients, setUsedIngredients } = props;
  const [renderIngredients, setRenderIngredients] = useState({});
  const [inProgress, setInProgress] = useLocalStorageNonString('inProgressRecipes', {
    drinks: {},
    meals: {},
  });

  console.log(inProgress);

  useEffect(() => {
    renderingIngredients(recipe, setRenderIngredients);
    const inLocalProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inLocalProgress) {
      const inType = inLocalProgress[type];
      if (inType) {
        const inId = inType[id];
        if (inId) setUsedIngredients(inId);
      }
    }
  }, [recipe]);

  const typeThe = {
    type,
    id,
    setInProgress,
  };

  return (
    renderIngredients.length > 0 ? renderIngredients.map((ingredient, i) => (
      <label
        key={ i }
        htmlFor={ ingredient }
        data-testid={ `${i}-ingredient-step` }
      >
        <input
          type="checkbox"
          id={ ingredient }
          onChange={ (event) => onChange(event, ingredient, setUsedIngredients, typeThe) }
          checked={ usedIngredients.some((index) => index === ingredient) }
        />
        {ingredient}
      </label>
    )) : <p>Carregando...</p>
  );
}

IngredientsCheckboxContainer.propTypes = {
  recipe: PropTypes.shape(),
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  usedIngredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  setUsedIngredients: PropTypes.func.isRequired,
}.isRequired;

export default IngredientsCheckboxContainer;
