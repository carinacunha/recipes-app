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
          className="size-Image"
          width="270px"
          data-testid={ `${index}-horizontal-image` }
          src={ recipe.image }
          alt="imagem not found"
        />
      </Link>
      <div
        styles={ { backgroundImage: `url(${recipe.image})`,
          background: 'linear-gradient(360deg, #0C0C0C 0%, rgba(12, 12, 12, 0) 40%)',
        } }
        className="textContent"
      >
        <Link to={ url }>
          <h3
            style={ { color: 'red', fontSize: 26 } }
            data-testid={ `${index}-horizontal-name` }
          >
            {recipe.name}
          </h3>
          <br />
        </Link>
        {
          recipe.type === 'meal' ? (
            <h3
              style={ { fontSize: 15 } }
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${recipe.nationality} - ${recipe.category}`}
            </h3>
          ) : (
            <h3
              style={ { fontSize: 15 } }
              data-testid={ `${index}-horizontal-top-text` }
            >
              {recipe.alcoholicOrNot}
            </h3>
          )
        }

        <h3
          style={ { color: '#D3D3D3' } }
          data-testid={ `${index}-horizontal-done-date` }
        >
          {recipe.doneDate}
        </h3>
        {
          recipe.tags?.map((tag) => (
            <h3
              key={ tag }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </h3>
          ))
        }
      </div>
      <ShareButtonDone recipe={ recipe } index={ index } />
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
