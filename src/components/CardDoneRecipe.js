import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import ShareButtonDone from './ShareButtonDone';
import Footer from './Footer';

function CardDoneRecipe({ recipe, index }) {
  const { type, id } = recipe;
  const url = type === 'meal' ? `/meals/${id}`
    : `/drinks/${id}`;
  return (

    <div>

      <Link to={ url }>
        <div
          className="card"
          style={ {
            background: `url(${recipe.image})`,
            backgroundSize: 'cover',
          } }
        >
          <div className="gradient">
            <h3
              className="name__recipe"
            >
              {recipe.name}
            </h3>
            <br />
            {
              recipe.type === 'meal' ? (
                <h3
                  className="category__recipe"
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {`${recipe.nationality} - ${recipe.category}`}
                </h3>
              ) : (
                <h3
                  className="category__recipe"
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {recipe.alcoholicOrNot}
                </h3>
              )
            }
            <h3
              className="date__recipe"
              style={ { color: '#D3D3D3' } }
              data-testid={ `${index}-horizontal-done-date` }
            >
              {recipe.doneDate}
            </h3>
            {
              recipe.tags?.map((tag) => (
                <h3
                  className="tag__recipe"
                  key={ tag }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag}
                </h3>
              ))
            }
          </div>
        </div>
      </Link>
      <ShareButtonDone recipe={ recipe } index={ index } />
      <Footer />
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
