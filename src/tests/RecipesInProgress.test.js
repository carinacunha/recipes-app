import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import App from '../App';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

const RECIPE_PHOTO = 'recipe-photo';
const FINISH_BUTTON = 'finish-recipe-btn';
const URL = '/meals/52977/in-progress';
const WATTER_CUP = 'Water - 1 cup ';
const LENTILS_CUP = 'Lentils - 1 cup ';
const SEA_SALT = 'Sea Salt - Pinch';

describe('Testa componentes da tela Recipes in Progress', () => {
  test('Testa se a imagem e título da receita é redenrizada', async () => {
    renderWithRouter(<App />, { initialEntries: [URL] });

    await waitFor(() => {
      expect(screen.getByTestId(RECIPE_PHOTO)).toBeInTheDocument();
    });
  });

  test('Testa se 3 inputs checkbox são renderizados', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks/15997/in-progress'] });

    await waitFor(() => {
      const checkbox = screen.getAllByRole('checkbox');
      userEvent.click(checkbox[0]);

      expect(checkbox.length).toBe(3);
      expect(checkbox[0]).toBeChecked();
    });
  });

  test('Testa se 13 inputs checkbox vem checados caso localStorage estiver preenchido', async () => {
    renderWithRouter(<App />, { initialEntries: [URL] });

    localStorage.setItem('inProgressRecipes', JSON.stringify({
      drinks: {},
      meals: {
        52977: [WATTER_CUP, SEA_SALT, LENTILS_CUP],
      },
    }));

    await waitFor(() => {
      const checkbox = screen.getAllByRole('checkbox');
      expect(checkbox.length).toBe(13);
      expect(checkbox[0]).toBeChecked();
    }, { timeout: 3000 });
  });

  test('Testa se pode mudar o checkbox', async () => {
    renderWithRouter(<App />, { initialEntries: [URL] });

    localStorage.setItem('inProgressRecipes', JSON.stringify({
      drinks: {},
      meals: {
        52977: [WATTER_CUP, SEA_SALT, LENTILS_CUP],
      },
    }));

    await waitFor(() => {
      const inputs = screen.getAllByRole('checkbox');
      expect(inputs[0]).toBeInTheDocument();
    }, { timeout: 3000 });

    const checkbox = screen.getAllByRole('checkbox');
    userEvent.click(checkbox[0]);
    expect(checkbox[0]).not.toBeChecked();
    userEvent.click(checkbox[0]);
    expect(checkbox[0]).toBeChecked();
  });

  test('testa o botao share', async () => {
    renderWithRouter(<App />, { initialEntries: [URL] });
    const mockData = 'http://localhost/meals/52977';
    const mockClipboard = {
      writeText: jest.fn(),
    };
    global.navigator.clipboard = mockClipboard;
    await waitFor(() => {
      const shareButton = screen.getByTestId('share-btn');
      expect(shareButton).toBeInTheDocument();
    }, { timeout: 3000 });
    userEvent.click(screen.getByTestId('share-btn'));
    expect(navigator.clipboard.writeText).toBeCalledTimes(1);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      mockData,
    );
  });

  test('testa o botao finish', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [URL] });

    localStorage.setItem('inProgressRecipes', JSON.stringify({
      drinks: {},
      meals: {
        52977: [
          WATTER_CUP,
          'Red Pepper Flakes - 1/4 tsp',
          'Mint - 1/2 tsp',
          'Tomato Puree - 1 tbs',
          LENTILS_CUP,
          'Onion - 1 large',
          'Cumin - 2 tsp',
          'Thyme - 1/2 tsp',
          'Vegetable Stock - 4 cups ',
          'Black Pepper - 1/4 tsp',
          'Paprika - 1 tsp ',
          'Carrots - 1 large',
        ],
      },
    }));
    await waitFor(() => {
      const finishButton = screen.getByTestId(FINISH_BUTTON);
      expect(finishButton).toBeInTheDocument();
      expect(finishButton).toBeDisabled();
    }, { timeout: 3000 });
    await waitFor(() => {
      const checkbox = screen.getAllByRole('checkbox');
      userEvent.click(checkbox[12]);
    }, { timeout: 3000 });
    expect(screen.getByTestId(FINISH_BUTTON)).not.toBeDisabled();
    userEvent.click(screen.getByTestId(FINISH_BUTTON));
    expect(history.location.pathname).toBe('/done-recipes');
  });

  test('testa o botao finish', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks/15997/in-progress'] });
    localStorage.setItem('doneRecipes', JSON.stringify([
      {
        id: '52977',
        type: 'comida',
        area: 'Canadian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Lentil Soup',
        image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
        doneDate: '23/06/2020',
        tags: ['Soup'],
      },
    ]));
    await waitFor(() => {
      const checkbox = screen.getAllByRole('checkbox');
      userEvent.click(checkbox[0]);
      userEvent.click(checkbox[1]);
      userEvent.click(checkbox[2]);
    }, { timeout: 3000 });
    expect(screen.getByTestId(FINISH_BUTTON)).not.toBeDisabled();
    userEvent.click(screen.getByTestId(FINISH_BUTTON));
    expect(history.location.pathname).toBe('/done-recipes');
  });

  test('testa o botao inProgress', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks/17222/in-progress'] });
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      meals: {
        52977: [WATTER_CUP, SEA_SALT, LENTILS_CUP],
      },
    }));
    await waitFor(() => {
      const checkbox = screen.getAllByRole('checkbox');
      expect(checkbox.length).toBe(4);
    }, { timeout: 3000 });
  });
});
