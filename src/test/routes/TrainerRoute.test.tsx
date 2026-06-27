import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../../store/slices/userSlice';
import traineesSlice from '../../store/slices/traineesSlice';
import type { RootState } from '../../store';
import PrivateRoute from '../../routes/PrivateRoute';
import TrainerRoute from '../../routes/TrainerRoute';

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
            <Route path="/trainings" element={<div>Trainings Page</div>} />
            <Route element={<TrainerRoute />}>
              <Route path="/trainings/add" element={<div>Add Training Page</div>} />
            </Route>
          </Route>
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('TrainerRoute', () => {
  it('redirects trainees away from the trainer-only route', () => {
    renderWithRoute(
      {
        user: { username: 'Camila.Mesa', role: 'TRAINEE', token: 'fake-token', isAuth: true, profile: null, loading: false, error: null },
        trainees: { items: [], loading: false, error: null, lastFetched: null },
      },
      '/trainings/add'
    );

    expect(screen.getByText('Trainings Page')).toBeInTheDocument();
    expect(screen.queryByText('Add Training Page')).not.toBeInTheDocument();
  });

  it('renders the trainer-only page for trainers', () => {
    renderWithRoute(
      {
        user: { username: 'Julian.Salva', role: 'TRAINER', token: 'fake-token', isAuth: true, profile: null, loading: false, error: null },
        trainees: { items: [], loading: false, error: null, lastFetched: null },
      },
      '/trainings/add'
    );

    expect(screen.getByText('Add Training Page')).toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });

  it('redirects unauthenticated users to login, not the trainings page', () => {
    renderWithRoute(
      {
        user: { username: null, role: null, token: null, isAuth: false, profile: null, loading: false, error: null },
        trainees: { items: [], loading: false, error: null, lastFetched: null },
      },
      '/trainings/add'
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Add Training Page')).not.toBeInTheDocument();
  });
});