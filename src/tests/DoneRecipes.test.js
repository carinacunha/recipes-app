import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import mockDoneRecipe from './mocks/mockDoneRecipe';
import DoneRecipes from '../pages/DoneRecipes';
import { mockFetchRecipes } from './mocks/mockFetchRecipes';
import App from '../App';

const URL = '/meals/52977';
const ID_TITLE = 'page-title';
const ID_BUTTON_SHARE = '0-horizontal-share-btn';
const ID_IMAGE = '0-horizontal-image';
const ID_FILTER_BTN = 'filter-by-all-btn';

describe('Testa a funcionalidade da página doneRecipe', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockFetchRecipes),
    }));
  });
  test('Testa se os componentes são renderizados na tela', async () => {
    // localStorage.getItem = jest.fn().mockImplementation(mockDoneRecipe);
    const { history } = renderWithRouter(<App />, { initialEntries: [URL] });
    const startBtn = await screen.findByTestId('start-recipe-btn');
    expect(startBtn).toBeInTheDocument();
    userEvent.click(startBtn);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/52977/in-progress');
    });
    const finishBtn = await screen.findByTestId('finish-recipe-btn');
    expect(finishBtn).toBeInTheDocument();
    userEvent.click(finishBtn);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/done-recipes');
    });
    screen.debug();
  });
});
