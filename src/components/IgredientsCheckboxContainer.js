import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import renderingIngredients from '../services/renderingIgredients';

const onChange = ({ target }, ingredient, setUsedIngredients, typeThe) => {
  const { type, id } = typeThe;
  const oldLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (target.checked) {
    if (oldLocal[type][id]) {
      oldLocal[type][id] = [...oldLocal[type][id], ingredient];
      localStorage.setItem('inProgressRecipes', JSON.stringify(oldLocal));
      setUsedIngredients(oldLocal[type][id]);
    } else {
      oldLocal[type][id] = [ingredient];
      localStorage.setItem('inProgressRecipes', JSON.stringify(oldLocal));
      setUsedIngredients(oldLocal[type][id]);
    }
  } else if (oldLocal[type][id]) {
    const newLocal = oldLocal[type][id].filter((i) => i !== ingredient);
    oldLocal[type][id] = newLocal;
    localStorage.setItem('inProgressRecipes', JSON.stringify(oldLocal));
    setUsedIngredients(oldLocal[type][id]);
  } else {
    console.error('aaaaaaaaaaaa');
  }
};

function IngredientsCheckboxContainer(props) {
  const { recipe, type, id } = props;
  const [renderIngredients, setRenderIngredients] = useState({});
  const [usedIngredients, setUsedIngredients] = useState([]);

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
  }, [props]);

  const typeThe = {
    type,
    id,
  };

  return (
    renderIngredients.length > 0 ? renderIngredients.map((ingredient, i) => (
      <label
        key={ i }
        htmlFor={ ingredient }
        data-testid="0-ingredient-step"
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
}.isRequired;

export default IngredientsCheckboxContainer;
