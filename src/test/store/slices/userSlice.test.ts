import { describe, it, expect } from 'vitest';
import userReducer, { setUserData, removeUserData } from '../../../store/slices/userSlice';

describe('userSlice', () => {
  const initialState = {
    username: null,
    role: null,
    token: null,
    isAuth: false,
    profile: null,
    loading: false,
    error: null,
  };

  it('returns the initial state when given an unknown action', () => {
    const result = userReducer(undefined, { type: 'unknown' });
    expect(result).toEqual(initialState);
  });

  it('setUserData stores username, role, and token, and sets isAuth to true', () => {
    const action = setUserData({
      username: 'Julian.Salva',
      role: 'TRAINER',
      token: 'fake-jwt-token',
    });

    const result = userReducer(initialState, action);

    expect(result.username).toBe('Julian.Salva');
    expect(result.role).toBe('TRAINER');
    expect(result.token).toBe('fake-jwt-token');
    expect(result.isAuth).toBe(true);
  });

  it('removeUserData resets state back to logged-out values', () => {
    const loggedInState = {
      username: 'Julian.Salva',
      role: 'TRAINER' as const,
      token: 'fake-jwt-token',
      isAuth: true,
      profile: null,
      loading: false,
      error: null,
    };

    const result = userReducer(loggedInState, removeUserData());

    expect(result.username).toBeNull();
    expect(result.role).toBeNull();
    expect(result.token).toBeNull();
    expect(result.isAuth).toBe(false);
    expect(result.profile).toBeNull();
  });
});