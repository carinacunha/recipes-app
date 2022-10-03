import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import { mockFetchFiltered, mockFetchRecipes } from './mocks/mockFetchRecipes';
import mockFetchRecipesList from './mocks/mockFetchRecipesList';

const cardsQuantity = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const recipesFoodsList = ['Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat'];
const recipesDrinksList = ['Ordinary Drink', 'Cocktail', 'Shake', 'Other/Unknown', 'Cocoa'];

const findCards = async (arr, length) => {
  await waitFor(() => {
    const cardsFiltered = arr
      .map((e) => screen.getByTestId(`${e}-recipe-card`));
    expect(cardsFiltered).toHaveLength(length);
  });
};

describe('Implementa casos de testes de Recipe.js', () => {
  test('Testa se a página de receitas de comidas é renderizada corretamente', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockFetchRecipes),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockFetchRecipesList),
    });
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });

    await findCards(cardsQuantity, 12);

    await waitFor(() => {
      const recipesListElement = recipesFoodsList
        .map((e) => screen.getByTestId(`${e}-category-filter`));
      expect(history.location.pathname).toBe('/meals');
      expect(recipesListElement).toHaveLength(5);
    });
  });

  test('Testa se a página de receitas de bebidas é renderizada corretamente', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockFetchRecipes),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockFetchRecipesList),
    });
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    await findCards(cardsQuantity, 12);

    await waitFor(() => {
      const recipesListElement = recipesDrinksList
        .map((e) => screen.getByTestId(`${e}-category-filter`));
      expect(history.location.pathname).toBe('/drinks');
      expect(recipesListElement).toHaveLength(5);
    });
  });

  test('Testa se é possível  filtrar as receitas por categoria', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockFetchRecipes),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockFetchRecipesList),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockFetchFiltered),
    });

    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const breackFastBtn = await screen.findByTestId('Breakfast-category-filter');
    userEvent.click(breackFastBtn);

    await findCards([0, 1, 2, 3, 4, 5, 6], 7);
  });

  test('Testa se é possível retirar o filtro quando o botão de categoria é clicado novamente', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockFetchRecipes)
        .mockResolvedValueOnce(mockFetchRecipesList)
        .mockResolvedValueOnce(mockFetchFiltered),
    });

    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const breackFastBtn = await screen.findByTestId('Breakfast-category-filter');
    userEvent.click(breackFastBtn);

    await findCards([0, 1, 2, 3, 4, 5, 6], 7);

    userEvent.click(breackFastBtn);

    await findCards(cardsQuantity, 12);
  });

  test('Testa se é possível retirar o filtro quando o botão all é clicado', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const getLoading = screen.getByText(/Carregando.../i);
    expect(getLoading).toBeInTheDocument();

    await waitFor(() => {
      const allCategory = screen.getByTestId('All-category-filter');
      userEvent.click(allCategory);
      expect(getLoading).toBeInTheDocument();
      expect(screen.getByTestId(RECIPE_PHOTO)).toBeInTheDocument();
      expect(getLoading).not.toBeInTheDocument();
    });
  });
});
