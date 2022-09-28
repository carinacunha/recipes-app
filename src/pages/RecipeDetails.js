import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import HeaderRecipe from '../components/HeaderRecipe';
import ButtonStart from '../components/ButtonStart';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import IngredientsContainer from '../components/IngredientsContainer';
import InstructionsContainer from '../components/InstructionsContainer';
import RecomendationsCard from '../components/RecomendationsCard';
import VideoContainer from '../components/VideoContainer';

function RecipeDetails(props) {
  const [recipe, setRecipe] = useState({});
  const { history, match: { params: { id } } } = props;
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

  return (
    <div>
      <HeaderRecipe type={ type } recipe={ recipe } />
      <IngredientsContainer recipe={ recipe } />
      <InstructionsContainer recipe={ recipe } />
      {type === 'meals' ? <VideoContainer recipe={ recipe } /> : null}
      <RecomendationsCard type={ type } id={ id } />
      <ButtonStart history={ history } id={ id } type={ type } recipe={ recipe } />
      <FavoriteButton recipe={ recipe } id={ id } type={ type } />
      <ShareButton history={ history } />
    </div>
  );
}

RecipeDetails.propTypes = {
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

export default RecipeDetails;
