import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testa o componente <Login />', () => {
  const BUTTON = 'login-submit-btn';
  const EMAIL = 'test@test.com';
  const PROFILE_BUTTON = 'profile-top-btn';
  const EMAIL_INPUT = 'email-input';
  const PASSWORD_INPUT = 'password-input';

  test('Testa se o email renderizado e o utilizado no login', async () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const loginButton = screen.getByTestId(BUTTON);

    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginButton);

    const profileButton = screen.getByTestId(PROFILE_BUTTON);
    userEvent.click(profileButton);

    await waitFor(() => expect(history.location.pathname).toBe('/profile'), { timeout: 2000 });
    expect(screen.getByTestId('profile-email')).toHaveTextContent(EMAIL);
  });

  test('Testa se o botao de logout funciona', async () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const loginButton = screen.getByTestId(BUTTON);

    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginButton);

    const profileButton = screen.getByTestId(PROFILE_BUTTON);
    userEvent.click(profileButton);

    const logoutButton = screen.getByTestId('profile-logout-btn');
    userEvent.click(logoutButton);
    await waitFor(() => expect(history.location.pathname).toBe('/'));
  });

  test('Testa se o botao de receitas feitas funciona', async () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const loginButton = screen.getByTestId(BUTTON);

    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginButton);

    const profileButton = screen.getByTestId(PROFILE_BUTTON);
    userEvent.click(profileButton);

    await waitFor(() => expect(history.location.pathname).toBe('/profile'));

    const doneRecipesButton = screen.getByTestId('profile-done-btn');
    userEvent.click(doneRecipesButton);
    await waitFor(() => expect(history.location.pathname).toBe('/done-recipes'), { timeout: 3000 });
  });

  test('Testa se o botao de receitas favoritas funciona', async () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const loginButton = screen.getByTestId(BUTTON);

    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginButton);

    const profileButton = screen.getByTestId(PROFILE_BUTTON);
    userEvent.click(profileButton);

    await waitFor(() => expect(history.location.pathname).toBe('/profile'));

    const favoriteRecipes = screen.getByTestId('profile-favorite-btn');
    userEvent.click(favoriteRecipes);

    await waitFor(() => expect(history.location.pathname).toBe('/favorite-recipes'));
  });

  test('Testa se caso nao existir user volta pro login', async () => {
    localStorage.clear();
    const { history } = renderWithRouter(<App />, { initialEntries: ['/profile'] });
    await waitFor(() => expect(history.location.pathname).toBe('/'));
  });
});
