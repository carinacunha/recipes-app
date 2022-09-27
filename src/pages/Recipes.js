import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ButtonSearch from '../components/ButtonSearch';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardRecipe from '../components/CardRecipe';
import fetchApi from '../services/fetchApi';

const FOODS_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const DRINKS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const LIST_RECIPE_FOODS = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const LIST_RECIPE_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

export default function Recipes() {
  const [recipesState, setRecipesState] = useState({
    recipes: [],
    type: '',
  });

  const [recipeList, setRecipeList] = useState({
    list: [],
    type: '',
  });

  const { location: { pathname } } = useHistory();

  useEffect(() => {
    let URL = '';
    let URL_LIST = '';
    let currKey = '';
    const ONZE = 11;
    const QUATRO = 4;

    switch (pathname) {
    case '/drinks': {
      URL = DRINKS_URL;
      URL_LIST = LIST_RECIPE_DRINKS;
      currKey = 'drinks';
      break;
    }
    default: {
      URL = FOODS_URL;
      URL_LIST = LIST_RECIPE_FOODS;
      currKey = 'meals';
    }
    }

    const fetchRecipes = async () => {
      const request = await fetchApi(URL);
      const onlyTwelveFirst = request[currKey].filter((e, i) => i <= ONZE);
      setRecipesState({
        recipes: onlyTwelveFirst,
        type: currKey,
      });
    };
    const fetchRecipeList = async () => {
      const request = await fetchApi(URL_LIST);
      const onlyFiveFirst = request[currKey].filter((e, i) => i <= QUATRO);
      setRecipeList({
        ...recipeList,
        list: onlyFiveFirst,
      });
    };

    fetchRecipes();
    fetchRecipeList();
  }, [pathname]); // eslint-disable-line

  return (
    <div>
      <Header />
      <ButtonSearch />
      <section>
        { recipeList.list.length > 0 ? recipeList.list.map(({ strCategory }) => (
          <button
            key={ strCategory }
            type="button"
            data-testid={ `${strCategory}-category-filter` }
          >
            {strCategory}
          </button>
        )) : null }
      </section>
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
