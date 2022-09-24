import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ButtonSearch from '../components/ButtonSearch';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardRecipe from '../components/CardRecipe';
import fetchApi from '../services/fetchApi';

const FOODS_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const DRINKS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

export default function Recipes({ history }) {
  const [recipesState, setRecipesState] = useState({
    recipes: [],
    type: '',
  });

  useEffect(() => {
    let URL = '';
    let currKey = '';
    const ONZE = 11;

    switch (history.location.pathname) {
    case '/drinks': {
      URL = DRINKS_URL;
      currKey = 'drinks';
      break;
    }
    default: {
      URL = FOODS_URL;
      currKey = 'meals';
    }
    }

    const FECTH = async () => {
      const request = await fetchApi(URL);
      const onlyTwelveFirst = request[currKey].filter((e, i) => i <= ONZE);
      setRecipesState({
        recipes: onlyTwelveFirst,
        type: currKey,
      });
    };
    FECTH();
  }, []); // eslint-disable-line

  return (
    <div>
      <Header />
      <ButtonSearch />
      <section>
        { recipesState.recipes.length > 0 ? recipesState.recipes.map((recipe, i) => (
          <CardRecipe
            key={ i }
            type={ recipesState.type }
            recipe={ recipe }
            index={ i }
          />
        )) : <p>Carregando...</p> }
      </section>
      <Footer />
    </div>
  );
}

Recipes.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape(),
  }),
}.isRequired;
