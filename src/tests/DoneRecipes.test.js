import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import { mockFetchRecipes } from './mocks/mockFetchRecipes';
import App from '../App';

const DATA = '23/09/2022';
const TAG = ['Soup'];

const done = [
  { alcoholicOrNot: 'Optional alcohol',
    category: 'Ordinary Drink',
    id: '15997',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    name: 'GG',
    nationality: '',
    type: 'drink',
    doneDate: DATA,
    tags: TAG,
  },
  { alcoholicOrNot: 'Alcoholic',
    category: 'Cocktail',
    id: '17222',
    image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
    name: 'A1',
    nationality: '',
    type: 'drink',
    doneDate: DATA,
    tags: TAG,
  },
  { alcoholicOrNot: 'Alcoholic',
    category: 'Shot',
    id: '13501',
    image: 'https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg',
    name: 'ABC',
    nationality: '',
    type: 'drink',
    doneDate: DATA,
    tags: TAG,
  },
  { alcoholicOrNot: '',
    category: 'Side',
    id: '52977',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    name: 'Corba',
    nationality: 'Turkish',
    type: 'meal',
    doneDate: DATA,
    tags: TAG,
  },
  { alcoholicOrNot: '',
    category: 'Side',
    id: '53060',
    image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
    name: 'Burek',
    nationality: 'Croatian',
    type: 'meal',
    doneDate: DATA,
    tags: TAG,
  },
  {
    alcoholicOrNot: '',
    category: 'Seafood',
    id: '53065',
    image: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg',
    name: 'Sushi',
    nationality: 'Japanese',
    type: 'meal',
    doneDate: DATA,
    tags: TAG,
  }];

const URL = '/done-recipes';

describe('Testa a funcionalidade da página doneRecipe', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockFetchRecipes),
    }));
  });

  test('Testa se os componentes são renderizados na tela', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(done));
    renderWithRouter(<App />, { initialEntries: [URL] });
    await waitFor(() => expect(screen.getByTestId('page-title')).toBeInTheDocument(), { timeout: 2000 });
    await waitFor(() => expect(screen.getByTestId('0-horizontal-image')).toBeInTheDocument(), { timeout: 2000 });
  });

  test('Testa se os filtros funcionam', async () => {
    const THREE = 3;
    const SIX = 6;
    localStorage.setItem('doneRecipes', JSON.stringify(done));
    renderWithRouter(<App />, { initialEntries: [URL] });
    const drinksButton = screen.getByTestId(/filter-by-drink-btn/i);
    const mealsButton = screen.getByTestId(/filter-by-meal-btn/i);
    const allButton = screen.getByTestId('filter-by-all-btn');
    userEvent.click(drinksButton);
    expect(screen.getAllByTestId(/[0-9]-horizontal-image/i)).toHaveLength(THREE);
    userEvent.click(allButton);
    expect(screen.getAllByTestId(/[0-9]-horizontal-image/i)).toHaveLength(SIX);
    userEvent.click(mealsButton);
    expect(screen.getAllByTestId(/[0-9]-horizontal-image/i)).toHaveLength(THREE);
  });

  test('testa o botao share', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(done));
    renderWithRouter(<App />, { initialEntries: [URL] });
    const mockData = 'http://localhost/drinks/15997';
    const mockClipboard = {
      writeText: jest.fn(),
    };
    global.navigator.clipboard = mockClipboard;
    userEvent.click(screen.getByTestId('0-horizontal-share-btn'));
    expect(navigator.clipboard.writeText).toBeCalledTimes(1);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      mockData,
    );
  });

  test('testa o botao share', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(done));
    renderWithRouter(<App />, { initialEntries: [URL] });
    const mockData = 'http://localhost/meals/52977';
    const mockClipboard = {
      writeText: jest.fn(),
    };
    global.navigator.clipboard = mockClipboard;
    userEvent.click(screen.getByTestId('3-horizontal-share-btn'));
    expect(navigator.clipboard.writeText).toBeCalledTimes(1);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      mockData,
    );
  });
});
