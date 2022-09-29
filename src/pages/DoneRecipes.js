import React from 'react';
import Header from '../components/Header';

const done = [{
  id: 0,
  type: 'meal',
  nationality: 'x',
  category: 'beef',
  alcoholicOrNot: 'no-alcoholic',
  name: 'frango',
  image: 'https://i0.wp.com/omeudiadia.com.br/wp-content/uploads/2022/03/ain.jpg?w=588&ssl=1',
  doneDate: '12',
  tags: ['Curry'],
},
{
  id: 0,
  type: 'meal',
  nationality: 'x',
  category: 'beef',
  alcoholicOrNot: 'no-alcoholic',
  name: 'frango',
  image: 'https://i0.wp.com/omeudiadia.com.br/wp-content/uploads/2022/03/oculos.jpg?w=736&ssl=1',
  doneDate: '12',
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
            >
              Compartilhar
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
