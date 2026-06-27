import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../../store/slices/userSlice';
import traineesSlice from '../../store/slices/traineesSlice';
import Header from '../../layout/Header/Header'; 
import type { RootState } from '../../store';

const renderWithProviders = (preloadedState: RootState) => {
  const store = configureStore({
    reducer: {
      user: userSlice,
      trainees: traineesSlice,
    },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </Provider>
  );
};

describe('Header', () => {
  it('shows Sign in and Join us links when logged out', () => {
    renderWithProviders({
      user: { username: null, role: null, token: null, isAuth: false, profile: null, loading: false, error: null },
      trainees: { items: [], loading: false, error: null, lastFetched: null },
    });

    expect(screen.getAllByText(/sign in/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/join us/i).length).toBeGreaterThan(0);
  });

  it('shows the username and hides Sign in when logged in', () => {
    renderWithProviders({
      user: { username: 'Julian.Salva', role: 'TRAINER', token: 'fake-token', isAuth: true, profile: null, loading: false, error: null },
      trainees: { items: [], loading: false, error: null, lastFetched: null },
    });

    expect(screen.getAllByText('Julian.Salva').length).toBeGreaterThan(0);
    expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument();
  });
});