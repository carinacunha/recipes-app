import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import HeaderRecipe from '../components/HeaderRecipe';
import RecipeImage from '../components/RecipeImage';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import InstructionsContainer from '../components/InstructionsContainer';
import FinishRecipeButton from '../components/FinishRecipeButton';
import IngredientsCheckboxContainer from '../components/IgredientsCheckboxContainer';
import '../css/Recipe.css';
import LoadingComponent from '../components/LoadingComponent';
import Footer from '../components/Footer';

function RecipeInProgress(props) {
  const [recipe, setRecipe] = useState({});
  const [usedIngredients, setUsedIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const { match: { params: { id } } } = props;
  const { match: { path }, history } = props;
  const type = path.split('/')[1];
  const urlType = type === 'meals' ? 'themealdb' : 'thecocktaildb';
  const url = `https://www.${urlType}.com/api/json/v1/1/lookup.php?i=${id}`;

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(url);
      const data = await response.json();
      if (type === 'meals') {
        setRecipe(data.meals[0]);
        setLoading(false);
      } else {
        setRecipe(data.drinks[0]);
        setLoading(false);
      }
    };
    fetchRecipe();
    const local = localStorage.getItem('inProgressRecipes');
    if (!local) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        drinks: {},
        meals: {},
      }));
    }
  }, []);

  return (
    loading ? <LoadingComponent /> : (
      <motion.div
        initial={ { opacity: 0 } }
        animate={ { opacity: 1 } }
        exit={ { opacity: 0 } }
      >
        <RecipeImage type={ type } recipe={ recipe } />
        <section className="page-recipe-container">
          <div className="ingredients-inprogress">
            <HeaderRecipe type={ type } recipe={ recipe } />
            <IngredientsCheckboxContainer
              recipe={ recipe }
              type={ type }
              id={ id }
              usedIngredients={ usedIngredients }
              setUsedIngredients={ setUsedIngredients }
            />
          </div>
          <InstructionsContainer recipe={ recipe } />
        </section>
        <div className="recipe-footer">
          <FinishRecipeButton
            recipe={ recipe }
            type={ type }
            id={ id }
            usedIngredients={ usedIngredients }
            history={ history }
          />
          <FavoriteButton recipe={ recipe } id={ id } type={ type } />
          <ShareButton history={ history } />
        </div>
        <Footer />
      </motion.div>
    )
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
