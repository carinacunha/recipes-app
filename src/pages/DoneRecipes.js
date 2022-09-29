import React from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

const done = [{
  id: 0,
  type: 'meal',
  nationality: 'x',
  category: 'Italian - Vegetarian',
  alcoholicOrNot: 'no-alcoholic',
  name: 'Spicy Arrabiata Penne',
  image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  doneDate: '23/06/2020',
  tags: ['Curry'],
},
{
  id: 0,
  type: 'meal',
  nationality: 'x',
  category: 'Italian - Vegetarian',
  alcoholicOrNot: 'no-alcoholic',
  name: 'Spicy Arrabiata Penne',
  image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  doneDate: '23/06/2020',
  tags: ['Pasta'],
},
];

function DoneRecipes() {
  return (
    <div>
      <Header />
      <button
        data-testid="filter-by-all-btn"
        type="button"
      >
        All
      </button>

      <button
        data-testid="filter-by-meal-btn"
        type="button"
      >
        Meals
      </button>

      <button
        data-testid="filter-by-drink-btn"
        type="button"
      >
        Drinks
      </button>

      {
        done.map((recipe, index) => (
          <div key={ index }>
            <img
              width="270px"
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt="imagem not found"
            />
            <h3
              data-testid={ `${index}-horizontal-top-text` }
            >
              { recipe.category }
            </h3>
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
                recipe.tags.map((tag, i) => (
                  <p
                    key={ i }
                    data-testid={ `${i}-${tag}-horizontal-tag` }
                  >
                    { tag }
                  </p>

                ))
              }
            </section>

          </div>
        ))
      }
    </div>
  );
}

export default DoneRecipes;
