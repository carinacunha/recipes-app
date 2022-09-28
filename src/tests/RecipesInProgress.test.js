import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import App from '../App';
import RecipeInProgress from '../pages/RecipeInProgress';

const RECIPE_PHOTO = 'recipe-photo';

describe('Testa componentes da tela Recipes in Progress', () => {
  test('Testa se a imagem e título da receita é redenrizada', () => {
    render(<RecipeInProgress />);

    expect(screen.getByTestId(RECIPE_PHOTO)).toBeInTheDocument();
  });

  test('Testa se 13 inputs checkbox são renderizados', () => {
    render(<RecipeInProgress />);

    const checkbox = screen.getAllByRole('checkbox');
    userEvent.click(checkbox[0]);

    expect(checkbox.length).toBe(13);
    expect(checkbox[0]).toBeChecked();
  });
});
