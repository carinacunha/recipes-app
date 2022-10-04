import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/CardRecipe.css';

export default function CardRecipe({ recipe, index, type }) {
  const findByType = (typeFood) => {
    if (typeFood === 'drinks') {
      const STR_DRINK_THUMB = 'strDrinkThumb';
      const STR_DRINK = 'strDrink';
      const ID_DRINK = 'idDrink';

      return [STR_DRINK_THUMB, STR_DRINK, ID_DRINK];
    }
    const STR_MEAL_THUMB = 'strMealThumb';
    const STR_MEAL = 'strMeal';
    const ID_MEAL = 'idMeal';

    return [STR_MEAL_THUMB, STR_MEAL, ID_MEAL];
  };

  return (
    <Link to={ `/${type}/${recipe[findByType(type)[2]]}` }>
      <motion.div
        initial={ { opacity: 0 } }
        animate={ { opacity: 1 } }
        exit={ { opacity: 0 } }
        className="card"
        data-testid={ `${index}-recipe-card` }
        style={ {
          background: `url(${recipe[findByType(type)[0]]})`,
          backgroundSize: 'cover',
        } }
      >
        <div className="gradient">
          <p
            className="name__recipe"
            data-testid={ `${index}-card-name` }
          >
            {recipe[findByType(type)[1]]}

          </p>
          <p className="category__recipe">Lorem</p>
        </div>
        {/* <img
          src={ recipe[findByType(type)[0]] }
          alt={ recipe[findByType(type)[1]] }
          width="200px"
          data-testid={ `${index}-card-img` }
        /> */}
      </motion.div>
    </Link>
  );
}

CardRecipe.propTypes = {
  recipe: PropTypes.shape(),
}.isRequired;
