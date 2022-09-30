import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import DoneRecipes from '../pages/DoneRecipes';
import { mockFetchRecipes } from './mocks/mockFetchRecipes';
import App from '../App';

const done = [{ alcoholicOrNot: '',
  category: 'Vegetarian',
  id: '53026',
  image: 'https://www.themealdb.com/images/media/meals/n3xxd91598732796.jpg',
  name: 'Tamiya',
  nationality: 'Egyptian',
  type: 'meals',
  doneDate: '2022-09-30T19:30:53.690Z',
  tags: [],
},
{ alcoholicOrNot: '',
  category: 'Side',
  id: '52977',
  image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  name: 'Corba',
  nationality: 'Turkish',
  type: 'meals',
  doneDate: '2022-09-30T21:03:11.883Z',
  tags: ['Soup'],
}];

const URL = '/done-recipes';
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
    renderWithRouter(<App />, { initialEntries: [URL] });
    localStorage.setItem('doneRecipes', JSON.stringify(done));
    console.log(JSON.parse(localStorage.getItem(('doneRecipes'))));
    await waitFor(() => expect(screen.getByTestId('page-title')).toBeInTheDocument(), { timeout: 2000 });
    await waitFor(() => expect(screen.getByTestId('0-horizontal-image')).toBeInTheDocument(), { timeout: 2000 });
    screen.debug();
  });
});
