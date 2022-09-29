import PropTypes from 'prop-types';
import React from 'react';
import shareIcon from '../images/shareIcon.svg';

function MealCard({ recipe, index }) {
  return (
    <div>
      <img
        width="270px"
        data-testid={ `${index}-horizontal-image` }
        src={ recipe.image }
        alt="imagem not found"
      />
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

      <h3
        data-testid={ `${index}-horizontal-name` }
      >
        { recipe.name }
      </h3>
      <h3
        data-testid={ `${index}-horizontal-done-date` }
      >
        { recipe.doneDate }
      </h3>
      <button
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
      >
        <img src={ shareIcon } alt="Compartilhar" />
      </button>
      <section>
        {
          recipe.tags.map((tag) => {
            console.log(tag);
            console.log(`${index}-${tag}-horizontal-tag`);
            return (
              <p
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                { tag }
              </p>
            );
          })
        }
      </section>

    </div>
  );
}

MealCard.propTypes = {
  index: PropTypes.number,
  recipe: PropTypes.shape({
    category: PropTypes.string,
    doneDate: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    tags: PropTypes.shape(),
  }),
}.isRequired;

export default MealCard;
