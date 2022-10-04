import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FavoritePageButton from './FavoritePageButton';
import ShareButtonDone from './ShareButtonDone';

function CardFavoriteRecipe({ recipe, index, setFavoriteRecipes }) {
  const { type, id } = recipe;
  const url = type === 'meal' ? `/meals/${id}`
    : `/drinks/${id}`;

  return (
    <div>
      <Link to={ url }>
        <img
          className="fav-image"
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
        {
          recipe.type === 'meal' ? (
            <h3
              style={ { color: 'red', fontSize: 25 } }
              data-testid={ `${index}-horizontal-top-text` }
            >
              { `${recipe.nationality} - ${recipe.category}` }
            </h3>
          ) : (
            <h3
              style={ { color: 'red', fontSize: 25 } }
              data-testid={ `${index}-horizontal-top-text` }
            >
              { recipe.alcoholicOrNot }
            </h3>
          )
        }
      </div>
      <Link to={ url }>
        <h3
          data-testid={ `${index}-horizontal-name` }
          style={ { color: 'red', fontSize: 32 } }
        >
          { recipe.name }
        </h3>
      </Link>

      <h3
        data-testid={ `${index}-horizontal-done-date` }
      >
        { recipe.doneDate }
      </h3>
      <section className="buttons">
        <FavoritePageButton
          index={ index }
          id={ id }
          setFavoriteRecipes={ setFavoriteRecipes }
        />
        <ShareButtonDone recipe={ recipe } index={ index } />
      </section>

    </div>
  );
}

CardFavoriteRecipe.propTypes = {
  index: PropTypes.number,
  recipe: PropTypes.shape({
    category: PropTypes.string,
    doneDate: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    tags: PropTypes.shape(),
  }),
}.isRequired;

export default CardFavoriteRecipe;
