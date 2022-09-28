import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import HeaderRecipe from '../components/HeaderRecipe';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import InstructionsContainer from '../components/InstructionsContainer';
import FinishRecipeButton from '../components/FinishRecipeButton';
import IngredientsCheckboxContainer from '../components/IgredientsCheckboxContainer';

function RecipeInProgress(props) {
  const [recipe, setRecipe] = useState({});
  const { match: { params: { id } } } = props;
  const { match: { path } } = props;
  const type = path.split('/')[1];
  const urlType = type === 'meals' ? 'themealdb' : 'thecocktaildb';
  const url = `https://www.${urlType}.com/api/json/v1/1/lookup.php?i=${id}`;

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(url);
      const data = await response.json();
      if (type === 'meals') {
        setRecipe(data.meals[0]);
      } else {
        setRecipe(data.drinks[0]);
      }
    };
    fetchRecipe();
  }, []);

  const { history } = props;

  return (
    <div>
      <HeaderRecipe type={ type } recipe={ recipe } />
      <IngredientsCheckboxContainer recipe={ recipe } />
      <InstructionsContainer recipe={ recipe } />
      <FinishRecipeButton />
      <FavoriteButton recipe={ recipe } id={ id } type={ type } />
      <ShareButton history={ history } />
    </div>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    path: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default RecipeInProgress;
