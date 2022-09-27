import React from 'react';
import PropTypes from 'prop-types';

import '../App.css';

function RecomendedMeals({ recomendation }) {
  return (
    <div className="row text-center">
      {recomendation?.map((e, index) => (
        <div
          key={ e.idMeal }
          data-testid={ `${index}-recommendation-card` }
          className="col-8 live__scroll--box"
        >
          <img src={ e.strMealThumb } alt={ e.strMeal } className="recomended_img" />
          <p
            data-testid={ `${index}-recommendation-title` }
          >
            { e.strMeal }
          </p>
        </div>
      ))}
    </div>
  );
}

RecomendedMeals.propTypes = {
  recomendation: PropTypes.arrayOf(PropTypes.shape()),
}.isRequired;

export default RecomendedMeals;
