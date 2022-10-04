import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardRecipe from '../components/CardRecipe';
import fetchApi from '../services/fetchApi';
import LoadingComponent from '../components/LoadingComponent';
import RecipesAppContext from '../context/RecipesAppContext';
import SearchBar from '../components/SearchBar';
import setURLFilter from '../services/setURLFilter';
import fetchFilterAPI from '../services/fetchFilterAPI';
import iconsBreakfast from '../images/iconsBreakfast.png';
import '../css/Recipes.css';

const FOODS_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const DRINKS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const LIST_RECIPE_FOODS = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const LIST_RECIPE_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const URL_FILTER_FOODS = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const URL_FILTER_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
const ONZE = 11;
let currKey = '';
let URL = '';

export default function Recipes() {
  const [loading, setLoading] = useState(true);
  const {
    currURL,
    barVisible,
  } = useContext(RecipesAppContext);
  const [recipesState, setRecipesState] = useState({
    recipes: [],
    type: '',
  });
  const [toggleFilter, setToggleFilter] = useState(true);
  const [recipeList, setRecipeList] = useState({
    list: [],
    type: '',
  });
  const { location: { pathname } } = useHistory();

  useEffect(() => {
    setLoading(true);

    let URL_LIST = '';
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
    if (currURL?.length > 0) {
      URL = currURL;
    }

    const fetchRecipes = async () => {
      const request = await fetchApi(URL);
      const onlyTwelveFirst = request[currKey]?.filter((e, i) => i <= ONZE);
      setRecipesState({
        recipes: onlyTwelveFirst,
        type: currKey,
      });
      setLoading(false);
    };
    const fetchRecipeList = async () => {
      const request = await fetchApi(URL_LIST);
      const onlyFiveFirst = request[currKey]?.filter((e, i) => i <= QUATRO);
      setRecipeList({
        ...recipeList,
        list: onlyFiveFirst,
      });
    };

    fetchRecipes();
    fetchRecipeList();
  }, [pathname, currURL]); // eslint-disable-line

  const getByCategory = async ({ target: { name } }) => {
    console.log(name);
    const URL_CATEGORY = setURLFilter(
      pathname,
      URL_FILTER_DRINKS,
      URL_FILTER_FOODS,
      name,
    );

    const onlyTwelveFirst2 = await fetchFilterAPI(URL_CATEGORY, currKey);
    setRecipesState({ ...recipesState, recipes: onlyTwelveFirst2 });
    setLoading(false);
    setToggleFilter(false);
  };

  const clearFilters = async () => {
    setLoading(true);

    const onlyTwelveFirst = await fetchFilterAPI(URL, currKey);
    setRecipesState({
      recipes: onlyTwelveFirst,
      type: currKey,
    });

    setLoading(false);
    setToggleFilter(true);
  };

  return (
    <main>
      <Header />
      {barVisible
      && (

        <SearchBar />

      )}
      { loading ? <LoadingComponent /> : (
        <section>
          <section className="live__scroll icons__category">
            { recipeList.list?.length > 0 ? recipeList.list.map(({ strCategory }) => (
              <label
                name={ strCategory }
                key={ strCategory }
                htmlFor={ strCategory }
                className="live__scroll--box icon__category"
              >
                <button
                  id={ strCategory }
                  name={ strCategory }
                  type="button"
                  onClick={ toggleFilter ? getByCategory : clearFilters }
                  data-testid={ `${strCategory}-category-filter` }
                >
                  <img src={ iconsBreakfast } alt="" />
                </button>
                <p>{strCategory}</p>
              </label>
            )) : null }
            <div className="live__scroll--box icon__category">
              <button
                type="button"
                onClick={ clearFilters }
                data-testid="All-category-filter"
              >
                <img src={ iconsBreakfast } alt="" />
              </button>
              <p>All</p>
            </div>
          </section>
          <section className="cards__recipes">
            { recipesState.recipes?.length > 0 ? recipesState.recipes.map((recipe, i) => (
              <CardRecipe
                key={ i }
                type={ recipesState.type }
                recipe={ recipe }
                index={ i }
              />
            )) : <span>Sem receitas para essa categoria</span> }
          </section>
        </section>
      ) }
      <Footer />
    </main>
  );
}
