import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testa as funcionalidades do Footer', () => {
  it('testa se existem dois botões e com atributo src', () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByAltText('drink button')).toHaveAttribute('src', drinkIcon);
    expect(screen.getByAltText('meal button')).toHaveAttribute('src', mealIcon);
  });

  it('Ao clicar no botão "meals", redireciona para a página meals', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    userEvent.click(screen.getByTestId('meals-bottom-btn'));
    expect(history.location.pathname).toBe('/meals');
  });

  it('Ao clicar no botão "drinks", redireciona para a página drinks', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });

    userEvent.click(screen.getByTestId('drinks-bottom-btn'));

    expect(history.location.pathname).toBe('/drinks');

    expect(screen.getByTestId('drinks-bottom-btn')).toBeInTheDocument();
    expect(screen.getByTestId('meals-bottom-btn')).toBeInTheDocument();
  });
});
