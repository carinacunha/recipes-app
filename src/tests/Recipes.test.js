import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import { mockFetchFoods, mockFetchDrinks, mockFiltered } from './mocks/mockFetchRecipes';
import { mockFetchFoodsList, mockFetchDrinksList } from './mocks/mockFetchRecipesList';

const cardsQuantity = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const recipesFoodsList = ['Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat'];
const recipesDrinksList = ['Ordinary Drink', 'Cocktail', 'Shake', 'Other/Unknown', 'Cocoa'];

describe('Implementa casos de testes de Recipe.js', () => {
  test('Testa se a página de receitas de comidas é renderizada corretamente', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockFetchFoods),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockFetchFoodsList),
    });
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });

    await waitFor(() => {
      const cardsElement = cardsQuantity
        .map((e) => screen.getByTestId(`${e}-recipe-card`));
      const recipesListElement = recipesFoodsList
        .map((e) => screen.getByTestId(`${e}-category-filter`));
      expect(history.location.pathname).toBe('/meals');
      expect(cardsElement).toHaveLength(12);
      expect(recipesListElement).toHaveLength(5);
    });
  });

  test('Testa se a página de receitas de bebidas é renderizada corretamente', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockFetchDrinks),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockFetchDrinksList),
    });
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    await waitFor(() => {
      const cardsElement = cardsQuantity
        .map((e) => screen.getByTestId(`${e}-recipe-card`));
      const recipesListElement = recipesDrinksList
        .map((e) => screen.getByTestId(`${e}-category-filter`));
      expect(history.location.pathname).toBe('/drinks');
      expect(cardsElement).toHaveLength(12);
      expect(recipesListElement).toHaveLength(5);
    });
  });

  test('Testa se é possível  filtrar as receitas por categoria', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockFetchFoods),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockFetchFoodsList),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockFiltered),
    });

    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const breackFastBtn = await screen.findByTestId('Breakfast-category-filter');
    userEvent.click(breackFastBtn);

    await waitFor(() => {
      const cardsFiltered = [0, 1, 2, 3, 4, 5, 6]
        .map((e) => screen.getByTestId(`${e}-recipe-card`));
      expect(cardsFiltered).toHaveLength(7);
    });
  });
});
