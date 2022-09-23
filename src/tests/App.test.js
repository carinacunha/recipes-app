import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '../components/Footer';

import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

describe('Testa as funcionalidades do Footer', () => {
  it('testa se existem dois botões e com atributo src', () => {
    render(<Footer />);

    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByAltText('drink button')).toHaveAttribute('src', drinkIcon);
    expect(screen.getByAltText('meal button')).toHaveAttribute('src', mealIcon);
  });

  it('Ao clicar no botão "meals", redireciona para a página meals', () => {
    render(<Footer />);

    userEvent.click(screen.getByTestId('meals-bottom-btn'));
  });

  it('Ao clicar no botão "drinks", redireciona para a página drinks', () => {
    render(<Footer />);

    userEvent.click(screen.getByTestId('drinks-bottom-btn'));

    expect(screen.getByTestId('drinks-bottom-btn')).toBeInTheDocument();
    expect(screen.getByTestId('meals-bottom-btn')).toBeInTheDocument();
  });
});
