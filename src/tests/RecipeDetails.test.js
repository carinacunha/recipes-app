import React from 'react';
import { screen } from '@testing-library/react';
// import RecipeDetails from '../pages/RecipeDetails';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

const START_BUTTON = 'start-recipe-btn';

describe('Testa o componente <RecipeDetails />', () => {
  test('Testa se o botão é redenrizado', () => {
    const { history } = renderWithRouter(<App />);

    history.push = '/meals/52977';

    const startButton = screen.getByTestId(START_BUTTON);
    expect(startButton).toBeInTheDocument();
  });
});
