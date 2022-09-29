import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import { mockFetchFiltered, mockFetchRecipes } from './mocks/mockFetchRecipes';
import mockFetchRecipesList from './mocks/mockFetchRecipesList';

describe('Testa o componente SearchBar', () => {
  it('Testa se limpa os inputs depois de clickar no botão caso retorne null', async () => {
    global.fetch = jest.fn(
      async () => ({
        json: async () => mockFetchRecipes,
      }),
    );
    await waitFor(() => (renderWithRouter(<App />, { initialEntries: ['/drinks'] })));

    const GET_IMAGE_BTN = screen.getByTestId(/search-top-btn/i);
    userEvent.click(GET_IMAGE_BTN);

    const GET_INPUT = screen.getByTestId(/search-input/i);
    const GET_FILTER = screen.getByTestId(/name-search-radio/i);
    userEvent.click(GET_FILTER);
    userEvent.type(GET_INPUT, 'aa');

    const GET_SEARCH_BTN = screen.getByTestId(/exec-search-btn/i);
    expect(GET_SEARCH_BTN).toBeInTheDocument();
    userEvent.click(GET_SEARCH_BTN);
    await waitFor(() => {
      expect(GET_INPUT.value).toEqual('');
    });
  });
  it('Testa se há um alerta caso digite mais de uma letra no "Input Radios First Letter"', async () => {
    global.fetch = jest.fn(
      async () => ({
        json: async () => mockFetchRecipes,
      }),
    );
    global.alert = jest.fn(() => /Your search must have only 1 (one) character/i);

    await waitFor(() => (renderWithRouter(<App />, { initialEntries: ['/meals'] })));

    const GET_IMAGE_BTN = screen.getByTestId(/search-top-btn/i);
    userEvent.click(GET_IMAGE_BTN);

    const GET_INPUT = screen.getByTestId(/search-input/i);
    const GET_FILTER = screen.getByTestId(/first-letter-search-radio/i);
    userEvent.click(GET_FILTER);
    userEvent.type(GET_INPUT, 'aa');

    expect(global.alert).toHaveBeenCalled();
  });
  it('testa se todos os "Inputs Radios podem ser selecionados"', async () => {
    global.fetch = jest.fn(
      async () => ({
        json: async () => mockFetchRecipes,
      }),
    );
    await waitFor(() => (renderWithRouter(<App />, { initialEntries: ['/meals'] })));

    const GET_IMAGE_BTN = screen.getByTestId(/search-top-btn/i);
    userEvent.click(GET_IMAGE_BTN);

    const GET_FILTER_NAME = screen.getByTestId(/name-search-radio/i);
    expect(GET_FILTER_NAME.checked).toBe(false);
    userEvent.click(GET_FILTER_NAME);
    expect(GET_FILTER_NAME.checked).toBe(true);

    const GET_FILTER_INGREDIENT = screen.getByTestId(/ingredient-search-radio/i);
    expect(GET_FILTER_INGREDIENT.checked).toBe(false);
    userEvent.click(GET_FILTER_INGREDIENT);
    expect(GET_FILTER_INGREDIENT.checked).toBe(true);

    const GET_FILTER_FIRSTLETTER = screen.getByTestId(/first-letter-search-radio/i);
    expect(GET_FILTER_FIRSTLETTER.checked).toBe(false);
    userEvent.click(GET_FILTER_FIRSTLETTER);
    expect(GET_FILTER_FIRSTLETTER.checked).toBe(true);
  });
});
