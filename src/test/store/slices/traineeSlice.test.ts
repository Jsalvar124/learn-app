import { describe, it, expect } from 'vitest';
import traineesReducer from '../../../store/slices/traineesSlice';
import { getAllTraineesThunk } from '../../../store/thunks/traineeThunk';
import type { TraineeSummary } from '../../../types/user';

describe('traineesSlice', () => {
  const initialState = {
    items: [],
    loading: false,
    error: null,
    lastFetched: null,
  };

  const mockTrainees: TraineeSummary[] = [
    { username: 'Camila.Mesa', firstName: 'Camila', lastName: 'Mesa', email: 'cmesa@learn.com' },
  ];

  it('returns the initial state when given an unknown action', () => {
    const result = traineesReducer(undefined, { type: 'unknown' });
    expect(result).toEqual(initialState);
  });

  it('sets loading to true and clears error on pending', () => {
    const action = { type: getAllTraineesThunk.pending.type };
    const result = traineesReducer(initialState, action);

    expect(result.loading).toBe(true);
    expect(result.error).toBeNull();
  });

  it('populates items and sets lastFetched on fulfilled', () => {
    const action = {
      type: getAllTraineesThunk.fulfilled.type,
      payload: mockTrainees,
    };
    const result = traineesReducer(initialState, action);

    expect(result.loading).toBe(false);
    expect(result.items).toEqual(mockTrainees);
    expect(result.lastFetched).not.toBeNull();
  });

  it('sets error message and stops loading on rejected', () => {
    const action = {
      type: getAllTraineesThunk.rejected.type,
      error: { message: 'Network error' },
    };
    const result = traineesReducer(initialState, action);

    expect(result.loading).toBe(false);
    expect(result.error).toBe('Network error');
  });
});