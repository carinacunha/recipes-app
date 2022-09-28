import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import { mockFetchMeal } from './mocks/mockFetchRecipes';
import App from '../App';

describe('Testa o componente <RecipeDetails />', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockFetchMeal),
    }));
  });
  test('Testa se a receita com meal e renderizada corretamente', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals/52977'] });
    await waitFor(() => expect(screen.getByTestId('recipe-photo')).toBeInTheDocument(), { timeout: 5000 });
    expect(screen.getByTestId('recipe-title')).toBeInTheDocument();
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
    expect(screen.getByTestId('0-ingredient-name-and-measure')).toBeInTheDocument();
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
    expect(screen.getByTestId('video')).toBeInTheDocument();
    expect(screen.getByTestId('0-recommendation-card')).toBeInTheDocument();
    expect(screen.getByTestId('start-recipe-btn')).toBeInTheDocument();
  });

  test('testa se com drinks renderiza corretamente', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks/15997'] });
    await waitFor(() => expect(screen.getByTestId('recipe-photo')).toBeInTheDocument(), { timeout: 5000 });
    expect(screen.getByTestId('recipe-title')).toBeInTheDocument();
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
    expect(screen.getByTestId('0-ingredient-name-and-measure')).toBeInTheDocument();
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
    expect(screen.getByTestId('0-recommendation-card')).toBeInTheDocument();
    expect(screen.getByTestId('start-recipe-btn')).toBeInTheDocument();
  });

  test('Testa se o botao de favoritos ja vem favoritado e se pode favoritar', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([{
      alcoholicOrNot: '',
      category: 'Side',
      id: '52977',
      image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      name: 'Corba',
      nationality: 'Turkish',
      type: 'meal',
    }]));
    renderWithRouter(<App />, { initialEntries: ['/meals/52977'] });
    await waitFor(() => expect(screen.getByTestId('recipe-photo')).toBeInTheDocument(), { timeout: 5000 });
    expect(screen.getByTestId('favorite-btn')).toHaveAttribute('src', 'blackHeartIcon.svg');
    userEvent.click(screen.getByTestId('favorite-btn'));
    expect(screen.getByTestId('favorite-btn')).toHaveAttribute('src', 'whiteHeartIcon.svg');
    userEvent.click(screen.getByTestId('favorite-btn'));
    expect(screen.getByTestId('favorite-btn')).toHaveAttribute('src', 'blackHeartIcon.svg');
  });

  test('testa se pode favoritar sem nada no localStorage', async () => {
    localStorage.clear();
    renderWithRouter(<App />, { initialEntries: ['/meals/52977'] });
    await waitFor(() => expect(screen.getByTestId('recipe-photo')).toBeInTheDocument(), { timeout: 5000 });
    expect(screen.getByTestId('favorite-btn')).toHaveAttribute('src', 'whiteHeartIcon.svg');
    userEvent.click(screen.getByTestId('favorite-btn'));
    expect(screen.getByTestId('favorite-btn')).toHaveAttribute('src', 'blackHeartIcon.svg');
  });

  test('testa se o botao nao apareca caso a receita ja esteja feita', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify([{
      alcoholicOrNot: '',
      category: 'Side',
      id: '52977',
      image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      name: 'Corba',
      type: 'meal',
      area: 'Turkish',
      doneDate: '23/06/2020',
      tags: ['Soup'],
    }]));
    renderWithRouter(<App />, { initialEntries: ['/meals/52977'] });
    await waitFor(() => expect(screen.getByTestId('recipe-photo')).toBeInTheDocument(), { timeout: 5000 });
    expect(screen.queryByTestId('start-recipe-btn')).not.toBeInTheDocument();
  });

  test('testa se, caso a receita esteja em progresso, o botao apareca', async () => {
    localStorage.clear();
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      meals: {
        52977: ['Corba'],
      },
    }));
    renderWithRouter(<App />, { initialEntries: ['/meals/52977'] });
    await waitFor(() => expect(screen.getByTestId('recipe-photo')).toBeInTheDocument(), { timeout: 5000 });
    expect(screen.getByTestId('start-recipe-btn')).toHaveTextContent('Continue Recipe');
  });

  test('testa se o botao de Iniciar receita funciona', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals/52977'] });
    await waitFor(() => expect(screen.getByTestId('recipe-photo')).toBeInTheDocument(), { timeout: 5000 });
    userEvent.click(screen.getByTestId('start-recipe-btn'));
    await waitFor(() => expect(history.location.pathname).toBe('/meals/52977/in-progress'), { timeout: 3000 });
  });

  test('testa o botao share', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals/52977'] });
    const mockData = 'http://localhost/meals/52977';
    const mockClipboard = {
      writeText: jest.fn(),
    };
    global.navigator.clipboard = mockClipboard;
    await waitFor(() => expect(screen.getByTestId('recipe-photo')).toBeInTheDocument(), { timeout: 5000 });
    userEvent.click(screen.getByTestId('share-btn'));
    expect(navigator.clipboard.writeText).toBeCalledTimes(1);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      mockData,
    );
  });
});
