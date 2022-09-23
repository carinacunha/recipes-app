import PropTypes from 'prop-types';
import React from 'react';

export default function CardRecipe({ recipe, index, type }) {
  const findByType = (typeFood) => {
    if (typeFood === 'drinks') {
      const STR_DRINK_THUMB = 'strDrinkThumb';
      const STR_DRINK = 'strDrink';

      return [STR_DRINK_THUMB, STR_DRINK];
    }
    const STR_MEAL_THUMB = 'strMealThumb';
    const STR_MEAL = 'strMeal';

    return [STR_MEAL_THUMB, STR_MEAL];
  };

  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        src={ recipe[findByType(type)[0]] }
        alt={ recipe[findByType(type)[1]] }
        width="200px"
        data-testid={ `${index}-card-img` }
      />
      <p data-testid={ `${index}-card-name` }>{recipe[findByType(type)[1]]}</p>
    </div>
  );
}

CardRecipe.propTypes = {
  recipe: PropTypes.shape(),
}.isRequired;
