import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Registration from '../../pages/Registration/Registration';
import * as userService from '../../services/userService';

describe('Registration', () => {
  it('shows trainer-specific fields when role=trainer', () => {
    render(
      <MemoryRouter initialEntries={['/registration?role=trainer']}>
        <Registration />
      </MemoryRouter>
    );

    expect(screen.getByText(/specialization/i)).toBeInTheDocument();
    expect(screen.queryByText(/date of birth/i)).not.toBeInTheDocument();
  });

  it('shows student-specific fields when role=student', () => {
    render(
      <MemoryRouter initialEntries={['/registration?role=student']}>
        <Registration />
      </MemoryRouter>
    );

    expect(screen.getByText(/date of birth/i)).toBeInTheDocument();
    expect(screen.queryByText(/specialization/i)).not.toBeInTheDocument();
  });
});

describe('Registration success flow', () => {
  it('shows the success screen after a successful student registration', async () => {
    vi.spyOn(userService, 'createTrainee').mockResolvedValue({
      username: 'test.trainee',
      password: 'generated123',
    });

    render(
      <MemoryRouter initialEntries={['/registration?role=student']}>
        <Registration />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Trainee' } });
    fireEvent.change(screen.getByLabelText(/date of birth/i), { target: { value: '2000-01-01' } });
    fireEvent.change(screen.getByLabelText(/address/i), { target: { value: '123 Main St' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/test\.trainee/i)).toBeInTheDocument();
    });
  });
});