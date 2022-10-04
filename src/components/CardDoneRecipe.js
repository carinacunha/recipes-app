import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import ShareButtonDone from './ShareButtonDone';

function CardDoneRecipe({ recipe, index }) {
  const { type, id } = recipe;
  const url = type === 'meal' ? `/meals/${id}`
    : `/drinks/${id}`;
  return (

    <div>
      <Link to={ url }>
        <img
          width="270px"
          data-testid={ `${index}-horizontal-image` }
          src={ recipe.image }
          alt="imagem not found"
        />
      </Link>
      {
        recipe.type === 'meal' ? (
          <h3
            data-testid={ `${index}-horizontal-top-text` }
          >
            { `${recipe.nationality} - ${recipe.category}` }
          </h3>
        ) : (
          <h3
            data-testid={ `${index}-horizontal-top-text` }
          >
            { recipe.alcoholicOrNot }
          </h3>
        )
      }
      <Link to={ url }>
        <h3
          data-testid={ `${index}-horizontal-name` }
        >
          { recipe.name }
        </h3>
      </Link>

      <h3
        data-testid={ `${index}-horizontal-done-date` }
      >
        { recipe.doneDate }
      </h3>

      <ShareButtonDone recipe={ recipe } index={ index } />

      <section>
        {
          recipe.tags?.map((tag) => (
            <p
              key={ tag }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              { tag }
            </p>
          ))
        }
      </section>

    </div>

  );
}

CardDoneRecipe.propTypes = {
  index: PropTypes.number,
  recipe: PropTypes.shape({
    category: PropTypes.string,
    doneDate: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    tags: PropTypes.shape(),
  }),
}.isRequired;

export default CardDoneRecipe;
