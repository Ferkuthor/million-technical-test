import { describe, it, expect, beforeEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { usePropertiesStore } from './propertiesStore';

describe('usePropertiesStore', () => {
  beforeEach(() => {
    const { resetFilters } = usePropertiesStore.getState();
    act(() => {
      resetFilters();
    });
  });

  it('should initialize with correct initial state', () => {
    const { getState } = usePropertiesStore;

    const state = getState();

    expect(state.filters).toEqual({
      name: '',
      address: '',
      minPrice: '',
      maxPrice: '',
    });
    expect(state.pagination).toEqual({
      page: 1,
      pageSize: 12,
    });
    expect(state.data).toBeNull();
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should update filters when setFilters is called', () => {
    const { result } = renderHook(() => usePropertiesStore());

    act(() => {
      result.current.setFilters({ name: 'Test Property', minPrice: '100000' });
    });

    expect(result.current.filters.name).toBe('Test Property');
    expect(result.current.filters.minPrice).toBe('100000');
    expect(result.current.filters.address).toBe('');
    expect(result.current.filters.maxPrice).toBe('');
  });

  it('should reset filters when resetFilters is called', () => {
    const { result } = renderHook(() => usePropertiesStore());

    act(() => {
      result.current.setFilters({ name: 'Test Property', address: 'Test Address' });
      result.current.resetFilters();
    });

    expect(result.current.filters.name).toBe('');
    expect(result.current.filters.address).toBe('');
    expect(result.current.filters.minPrice).toBe('');
    expect(result.current.filters.maxPrice).toBe('');
    expect(result.current.pagination.page).toBe(1);
  });
});