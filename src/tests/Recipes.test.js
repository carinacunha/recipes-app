import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockFetchRecipes from './mocks/mockFetchRecipes';
import mockFetchRecipesList from './mocks/mockFetchRecipesList';

const cardsQuantity = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const recipesList = ['Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat'];

describe('Implementa casos de testes de Recipe.js', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockFetchRecipes),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockFetchRecipesList),
    });
  });

  test('Testa se a página de receitas de comidas é renderizada corretamente', async () => {
    render(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId(/login-submit-btn/i);
    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginButton);

    await waitFor(() => {
      const cardsElement = cardsQuantity
        .map((e) => screen.getByTestId(`${e}-recipe-card`));
      const recipesListElement = recipesList
        .map((e) => screen.getByTestId(`${e}-category-filter`));
      expect(window.location.pathname).toBe('/meals');
      expect(cardsElement).toHaveLength(12);
      expect(recipesListElement).toHaveLength(5);
    });
  });
});
