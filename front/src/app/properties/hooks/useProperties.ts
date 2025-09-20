import { useQuery } from '@tanstack/react-query';
import { PropertyListDto, PaginatedResponseDto } from '../types';

export const fetchProperties = async (): Promise<PaginatedResponseDto<PropertyListDto>> => {
  const response = await fetch('http://localhost:5116/api/properties');
  if (!response.ok) {
    throw new Error('Failed to fetch properties');
  }
  return response.json();
};

export const useProperties = (initialData?: PaginatedResponseDto<PropertyListDto>) => {
  return useQuery({
    queryKey: ['properties'],
    queryFn: fetchProperties,
    initialData,
    enabled: !initialData, // Solo hacer fetch si NO tenemos initialData del servidor
    staleTime: Infinity, // Nunca considerar los datos stale
    refetchOnMount: false, // Nunca refetch al montar
    refetchOnWindowFocus: false, // Nunca refetch al cambiar foco
    refetchOnReconnect: false, // Nunca refetch al reconectar
    refetchInterval: false, // Desactivar refetch automático
  });
};