import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../../store/slices/userSlice';
import traineesSlice from '../../store/slices/traineesSlice';
import Login from '../../pages/Login/Login';

const renderLogin = () => {
  const store = configureStore({
    reducer: { user: userSlice, trainees: traineesSlice },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );
};

describe('Login', () => {
  it('shows validation errors and does not submit when fields are empty', () => {
    renderLogin();

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/username is required/i, { selector: 'p' })).toBeInTheDocument();
    expect(screen.getByText(/password is required/i, { selector: 'p' })).toBeInTheDocument();
  });
});