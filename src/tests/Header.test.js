import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import Header from '../components/Header';
import App from '../App';

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

    userEvent.click(iconPerfil);
    history.push('/profile');
    expect(title).toBeInTheDocument();
  });

  test('Verifica se ao clicar no icone search a caixa aparece', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');

    const iconSearch = screen.getByTestId('search-top-btn');
    expect(iconSearch).toBeInTheDocument();
    userEvent.click(iconSearch);

    const box = screen.getByTestId('search-input');
    await waitFor(() => expect(box).toBeInTheDocument());

    userEvent.click(iconSearch);
    await waitFor(() => expect(box).not.toBeInTheDocument());
  });
});
