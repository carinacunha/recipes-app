import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

const mockLocal = [
  { alcoholicOrNot: 'Optional alcohol',
    category: 'Ordinary Drink',
    id: '15997',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    name: 'GG',
    nationality: '',
    type: 'drink',
  },
  { alcoholicOrNot: 'Alcoholic',
    category: 'Cocktail',
    id: '17222',
    image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
    name: 'A1',
    nationality: '',
    type: 'drink',
  },
  { alcoholicOrNot: 'Alcoholic',
    category: 'Shot',
    id: '13501',
    image: 'https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg',
    name: 'ABC',
    nationality: '',
    type: 'drink' },
  { alcoholicOrNot: '',
    category: 'Side',
    id: '52977',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    name: 'Corba',
    nationality: 'Turkish',
    type: 'meal' },
  { alcoholicOrNot: '',
    category: 'Side',
    id: '53060',
    image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
    name: 'Burek',
    nationality: 'Croatian',
    type: 'meal',
  },
  {
    alcoholicOrNot: '',
    category: 'Seafood',
    id: '53065',
    image: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg',
    name: 'Sushi',
    nationality: 'Japanese',
    type: 'meal',
  }];

const NAME = '0-horizontal-name';
const URL = '/favorite-recipes';

describe('Testa FavoritePage', () => {
  test('Testa se ao clicar no botao o favorito some', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockLocal));
    renderWithRouter(<App />, { initialEntries: [URL] });
    await waitFor(() => {
      const card = screen.getByTestId(NAME);
      expect(card).toBeInTheDocument();
      expect(card).toHaveTextContent('GG');
    });
    const favoriteButton = screen.getByTestId('0-horizontal-favorite-btn');
    userEvent.click(favoriteButton);
    await waitFor(() => {
      const card = screen.getByTestId(NAME);
      expect(card).toBeInTheDocument();
      expect(card).not.toHaveTextContent('GG');
    });
  });

  test('Testa os filtros', async () => {
    const THREE = 3;
    const SIX = 6;
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockLocal));
    renderWithRouter(<App />, { initialEntries: [URL] });
    await waitFor(() => {
      const card = screen.getByTestId(NAME);
      expect(card).toBeInTheDocument();
    });
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

  test('testa filtro all', () => {
    const SIX = 6;
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockLocal));
    renderWithRouter(<App />, { initialEntries: [URL] });
    const drinksButton = screen.getByTestId(/filter-by-drink-btn/i);
    const allButton = screen.getByTestId('filter-by-all-btn');
    userEvent.click(drinksButton);
    userEvent.click(allButton);
    expect(screen.getAllByTestId(/[0-9]-horizontal-image/i)).toHaveLength(SIX);
  });
});
