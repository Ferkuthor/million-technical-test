import { useQuery } from '@tanstack/react-query';
import { PropertyListDto, PaginatedResponseDto, PropertyDetailDto } from '@/lib/types';
import { API_BASE_URL } from '@/lib/config';

export interface FetchPropertiesParams {
  page?: string;
  pageSize?: string;
  name?: string;
  address?: string;
  minPrice?: string;
  maxPrice?: string;
}

// Fetch properties list
export const fetchProperties = async (params: FetchPropertiesParams = {}): Promise<PaginatedResponseDto<PropertyListDto>> => {
  const queryParams = new URLSearchParams();
  if (params.page) queryParams.append('page', params.page);
  if (params.pageSize) queryParams.append('pageSize', params.pageSize);
  if (params.name) queryParams.append('name', params.name);
  if (params.address) queryParams.append('address', params.address);
  if (params.minPrice) queryParams.append('minPrice', params.minPrice);
  if (params.maxPrice) queryParams.append('maxPrice', params.maxPrice);

  const url = `${API_BASE_URL}/api/properties${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch properties');
  }
  return response.json();
};

// Fetch property detail
export const fetchPropertyDetail = async (id: string): Promise<PropertyDetailDto> => {
  const url = `${API_BASE_URL}/api/properties/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Property not found');
    }
    throw new Error('Failed to fetch property details');
  }
  return response.json();
};

// Use react query 
export const useProperties = (params: FetchPropertiesParams = {}, initialData?: PaginatedResponseDto<PropertyListDto>) => {
  const currentPage = params.page ? parseInt(params.page) : 1;
  const currentPageSize = params.pageSize ? parseInt(params.pageSize) : 12;

  // Check if initialData matches current params
  const shouldUseInitialData = initialData &&
    initialData.pagination.currentPage === currentPage &&
    initialData.pagination.pageSize === currentPageSize;

  return useQuery({
    queryKey: ['properties', params],
    queryFn: () => fetchProperties(params),
    initialData: shouldUseInitialData ? initialData : undefined,
    enabled: !shouldUseInitialData, // Only fetch if we don't have matching initialData
    staleTime: 5 * 60 * 1000, // 5 minutes: allows revalidation if data changes
    gcTime: 10 * 60 * 1000, // 10 minutes: how long to cache data
    retry: 3, // Retry up to 3 times on error
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    refetchOnMount: 'always', // Force refetch when page changes to ensure fresh data
    refetchOnWindowFocus: false, // Keep false to avoid fetches on focus change
    refetchOnReconnect: true, // Re-fetch on reconnect if no initialData
    refetchInterval: false,
  });
};


