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
    staleTime: 5 * 60 * 1000, // 5 minutos: permite revalidación si los datos cambian
    gcTime: 10 * 60 * 1000, // 10 minutos: cuánto tiempo cachear los datos
    retry: 3, // Reintentar hasta 3 veces en caso de error
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Backoff exponencial
    refetchOnMount: false,
    refetchOnWindowFocus: false, // Mantener false para evitar fetches al cambiar foco
    refetchOnReconnect: true, // Re-fetch al reconectar si no hay initialData
    refetchInterval: false,
  });
};
