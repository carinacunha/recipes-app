import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testa o componente <Login />', () => {
  const BUTTON = 'login-submit-btn';

  test('Testa se ao entrar na pagina o botao esta desabilitado', () => {
    renderWithRouter(<App />);

    const loginButton = screen.getByTestId(BUTTON);
    expect(loginButton).toBeDisabled();
  });

  test('Testa se ao preencher os inputs corretamente, o botão login é habilitado', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId(BUTTON);
    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, '1234567');
    expect(loginButton).toBeEnabled();
  });

  test('Testa se ao clicar no botão play o usuário é redirecionado para a página Recipes', async () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId(BUTTON);
    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginButton);
    await waitFor(() => expect(history.location.pathname).toBe('/meals'));
  });
});
