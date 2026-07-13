import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../../store/slices/userSlice';
import traineesSlice from '../../store/slices/traineesSlice';
import type { RootState } from '../../store';
import PrivateRoute from '../../routes/PrivateRoute';

const renderWithRoute = (preloadedState: RootState, initialPath: string) => {
  const store = configureStore({
    reducer: {
      user: userSlice,
      trainees: traineesSlice,
    },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route element={<PrivateRoute />}>
            <Route path="/my-account" element={<div>My Account Page</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('PrivateRoute', () => {
  it('redirects to /login when the user is not authenticated', () => {
    renderWithRoute(
      {
        user: { username: null, role: null, token: null, isAuth: false, profile: null, loading: false, error: null },
        trainees: { items: [], loading: false, error: null, lastFetched: null },
      },
      '/my-account'
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('My Account Page')).not.toBeInTheDocument();
  });

  it('renders the protected page when the user is authenticated', () => {
    renderWithRoute(
      {
        user: { username: 'Julian.Salva', role: 'TRAINER', token: 'fake-token', isAuth: true, profile: null, loading: false, error: null },
        trainees: { items: [], loading: false, error: null, lastFetched: null },
      },
      '/my-account'
    );

    expect(screen.getByText('My Account Page')).toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });
});