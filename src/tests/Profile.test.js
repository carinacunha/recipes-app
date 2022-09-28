import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testa o componente <Login />', () => {
  const BUTTON = 'login-submit-btn';
  const EMAIL = 'test@test.com';
  const PROFILE_BUTTON = 'profile-top-btn';

  beforeEach(() => {
    render(<App />);
  });

  test('Testa se o email renderizado e o utilizado no login', async () => {
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId(BUTTON);
    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginButton);
    const profileButton = screen.getByTestId(PROFILE_BUTTON);
    userEvent.click(profileButton);
    await waitFor(() => expect(window.location.pathname).toBe('/profile'), { timeout: 3000 });
    expect(screen.getByTestId('profile-email')).toHaveTextContent(EMAIL);
  });

  test('Testa se o botao de logout funciona', async () => {
    const logoutButton = screen.getByTestId('profile-logout-btn');
    userEvent.click(logoutButton);
    await waitFor(() => expect(window.location.pathname).toBe('/'), { timeout: 3000 });
  });

  test('Testa se o botao de receitas feitas funciona', async () => {
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId(BUTTON);
    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginButton);
    const profileButton = screen.getByTestId(PROFILE_BUTTON);
    userEvent.click(profileButton);
    await waitFor(() => expect(window.location.pathname).toBe('/profile'), { timeout: 3000 });
    const doneRecipesButton = screen.getByTestId('profile-done-btn');
    userEvent.click(doneRecipesButton);
    await waitFor(() => expect(window.location.pathname).toBe('/done-recipes'), { timeout: 3000 });
  });

  test('Testa se o botao de receitas favoritas funciona', async () => {
    const profileButton = screen.getByTestId(PROFILE_BUTTON);
    userEvent.click(profileButton);
    await waitFor(() => expect(window.location.pathname).toBe('/profile'), { timeout: 3000 });
    const favoriteRecipes = screen.getByTestId('profile-favorite-btn');
    userEvent.click(favoriteRecipes);
    await waitFor(() => expect(window.location.pathname).toBe('/favorite-recipes'), { timeout: 3000 });
  });
});
