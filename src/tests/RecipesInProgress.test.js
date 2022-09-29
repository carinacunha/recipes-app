import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import App from '../App';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

const RECIPE_PHOTO = 'recipe-photo';

describe('Testa componentes da tela Recipes in Progress', () => {
  test('Testa se a imagem e título da receita é redenrizada', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals/52977/in-progress'] });

    await waitFor(() => {
      expect(screen.getByTestId(RECIPE_PHOTO)).toBeInTheDocument();
    });
  });

  test('Testa se 13 inputs checkbox são renderizados', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals/52977/in-progress'] });

    await waitFor(() => {
      const checkbox = screen.getAllByRole('checkbox');
      userEvent.click(checkbox[0]);

      expect(checkbox.length).toBe(13);
      expect(checkbox[0]).toBeChecked();
    });
  });
});
