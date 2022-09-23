import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import RecipesAppProvider from './context/RecipesAppProvider';
import Login from './pages/Login';
import Loading from './pages/Loading';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipesInProgress';
import NotFound from './pages/NotFound';

function App() {
  return (
    <RecipesAppProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Recipes } />
          <Route exact path="/drinks" component={ Recipes } />
          <Route exact path="/meals/:id" component={ RecipeDetails } />
          <Route exact path="/drinks/:id" component={ RecipeDetails } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route exact path="/meals/:id/in-progress" component={ RecipeInProgress } />
          <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
          <Route exact path="/loading" component={ Loading } />
          <Route component={ NotFound } />
        </Switch>
      </BrowserRouter>
    </RecipesAppProvider>
  );
}

export default App;
