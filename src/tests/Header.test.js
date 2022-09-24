import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import Header from '../components/Header';

describe('Testa o componente', () => {
  test('Verifica se os componentes são renderizados na tela', () => {
    const { history } = renderWithRouter(<Header />);
    history.push('/meals');

    const iconPerfil = screen.getByTestId('profile-top-btn');
    const title = screen.getByTestId('page-title');

    expect(iconPerfil).toBeInTheDocument();
    expect(title).toBeInTheDocument();

    userEvent.click(iconPerfil);
    history.push('/profile');
    expect(title).toBeInTheDocument();
  });
});
