import { renderHook } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useProperties, fetchProperties, fetchPropertyDetail, FetchPropertiesParams } from './useProperties';
import { PropertyDetailDto } from '@/lib/types';
import { API_BASE_URL } from '@/config/app-config';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock useQuery
vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
}));

import { useQuery } from '@tanstack/react-query';

describe('useProperties hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('fetchProperties', () => {
    it('fetches properties without params', async () => {
      const mockResponse = {
        data: [],
        pagination: { currentPage: 1, pageSize: 12, totalPages: 1, totalItems: 0, hasNext: false, hasPrevious: false },
      };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await fetchProperties();

      expect(mockFetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/properties`);
      expect(result).toEqual(mockResponse);
    });

    it('fetches properties with params', async () => {
      const params: FetchPropertiesParams = {
        page: '2',
        pageSize: '10',
        name: 'Test Property',
      };
      const mockResponse = {
        data: [],
        pagination: { currentPage: 2, pageSize: 10, totalPages: 1, totalItems: 0, hasNext: false, hasPrevious: false },
      };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await fetchProperties(params);

      expect(mockFetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/properties?page=2&pageSize=10&name=Test+Property`);
      expect(result).toEqual(mockResponse);
    });

    it('throws error on fetch failure', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
      });

      await expect(fetchProperties()).rejects.toThrow('Failed to fetch properties');
    });
  });

  describe('fetchPropertyDetail', () => {
    it('fetches property detail successfully', async () => {
      const mockResponse: PropertyDetailDto = {
        id: '1',
        name: 'Test Property',
        address: 'Test Address',
        price: 100000,
        codeInternal: '123',
        year: 2020,
        owner: { id: '1', name: 'Owner', address: 'Owner Address', photo: 'photo.jpg', birthday: '1990-01-01' },
        images: [],
        trace: [],
      };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await fetchPropertyDetail('1');

      expect(mockFetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/properties/1`);
      expect(result).toEqual(mockResponse);
    });

    it('throws "Property not found" on 404', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(fetchPropertyDetail('1')).rejects.toThrow('Property not found');
    });

    it('throws generic error on other failures', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      await expect(fetchPropertyDetail('1')).rejects.toThrow('Failed to fetch property details');
    });
  });

  describe('useProperties', () => {
    const mockUseQuery = vi.mocked(useQuery);

    it('calls useQuery with correct params', () => {
      const params: FetchPropertiesParams = { page: '1', pageSize: '12' };
      const mockQueryResult = {
        data: null,
        isLoading: false,
        isError: false,
        error: null,
        isPending: false,
        isSuccess: true,
        isLoadingError: false,
        isRefetchError: false,
        isPlaceholderData: false,
        status: 'success',
        fetchStatus: 'idle',
        refetch: vi.fn(),
        remove: vi.fn(),
      } as ReturnType<typeof useQuery>;
      mockUseQuery.mockReturnValue(mockQueryResult);

      renderHook(() => useProperties(params));

      expect(mockUseQuery).toHaveBeenCalledWith({
        queryKey: ['properties', params],
        queryFn: expect.any(Function),
        initialData: undefined,
        enabled: true,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: 3,
        retryDelay: expect.any(Function),
        refetchOnMount: 'always',
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        refetchInterval: false,
      });
    });

    it('uses initialData when it matches params', () => {
      const params: FetchPropertiesParams = { page: '1', pageSize: '12' };
      const initialData = {
        data: [],
        pagination: { currentPage: 1, pageSize: 12, totalPages: 1, totalItems: 0, hasNext: false, hasPrevious: false },
      };
      const mockQueryResult = { data: initialData, isLoading: false } as ReturnType<typeof useQuery>;
      mockUseQuery.mockReturnValue(mockQueryResult);

      renderHook(() => useProperties(params, initialData));

      expect(mockUseQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          initialData: initialData,
          enabled: false,
        })
      );
    });

    it('does not use initialData when params do not match', () => {
      const params: FetchPropertiesParams = { page: '2', pageSize: '12' };
      const initialData = {
        data: [],
        pagination: { currentPage: 1, pageSize: 12, totalPages: 1, totalItems: 0, hasNext: false, hasPrevious: false },
      };
      const mockQueryResult = { data: null, isLoading: false } as ReturnType<typeof useQuery>;
      mockUseQuery.mockReturnValue(mockQueryResult);

      renderHook(() => useProperties(params, initialData));

      expect(mockUseQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          initialData: undefined,
          enabled: true,
        })
      );
    });

    it('returns the result from useQuery', () => {
      const params: FetchPropertiesParams = {};
      const mockQueryResult = { data: 'test data', isLoading: true, error: null } as ReturnType<typeof useQuery>;
      mockUseQuery.mockReturnValue(mockQueryResult);

      const { result } = renderHook(() => useProperties(params));

      expect(result.current).toEqual(mockQueryResult);
    });
  });
});