import React from 'react';
import PropTypes from 'prop-types';

import '../App.css';

function RecomendedDrinks({ recomendation }) {
  return (
    <div className="row text-center">
      {recomendation?.map((e, index) => (
        <div
          key={ e.idDrink }
          data-testid={ `${index}-recommendation-card` }
          className="col-8 live__scroll--box"
        >
          <img src={ e.strDrinkThumb } alt={ e.strDrink } className="recomended_img" />
          <p
            data-testid={ `${index}-recommendation-title` }
          >
            { e.strDrink }
          </p>
        </div>
      ))}
    </div>
  );
}

RecomendedDrinks.propTypes = {
  recomendation: PropTypes.arrayOf(PropTypes.shape()),
}.isRequired;

export default RecomendedDrinks;
