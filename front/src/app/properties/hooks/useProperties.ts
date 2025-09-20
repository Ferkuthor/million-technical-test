import { useQuery } from '@tanstack/react-query';

interface PropertyListDto {
  id: string;
  name: string;
  address: string;
  price: number;
  year: number;
  mainImage?: string;
}

interface PaginatedResponseDto<T> {
  data: T[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

const fetchProperties = async (): Promise<PaginatedResponseDto<PropertyListDto>> => {
  const response = await fetch('http://localhost:5116/api/properties');
  if (!response.ok) {
    throw new Error('Failed to fetch properties');
  }
  return response.json();
};

export const useProperties = () => {
  return useQuery({
    queryKey: ['properties'],
    queryFn: fetchProperties,
  });
};