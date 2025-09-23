import { create } from 'zustand';
import { PropertyListDto, PaginatedResponseDto } from '@/app/properties/types';
import { fetchProperties, FetchPropertiesParams } from '@/app/properties/hooks/useProperties';

interface PropertiesState {
  // Filters
  filters: {
    name: string;
    address: string;
    minPrice: string;
    maxPrice: string;
  };
  // Pagination
  pagination: {
    page: number;
    pageSize: number;
  };
  // Data
  data: PaginatedResponseDto<PropertyListDto> | null;
  // UI state
  loading: boolean;
  error: string | null;
}

interface PropertiesActions {
  setFilters: (filters: Partial<PropertiesState['filters']>) => void;
  setPagination: (pagination: Partial<PropertiesState['pagination']>) => void;
  fetchData: () => Promise<void>;
  resetFilters: () => void;
  initialize: (initialData: PaginatedResponseDto<PropertyListDto>, params: FetchPropertiesParams) => void;
}

type PropertiesStore = PropertiesState & PropertiesActions;

const initialState: PropertiesState = {
  filters: {
    name: '',
    address: '',
    minPrice: '',
    maxPrice: '',
  },
  pagination: {
    page: 1,
    pageSize: 12,
  },
  data: null,
  loading: false,
  error: null,
};

export const usePropertiesStore = create<PropertiesStore>((set, get) => ({
  ...initialState,

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
  },

  setPagination: (newPagination) => {
    set((state) => ({
      pagination: { ...state.pagination, ...newPagination },
    }));
  },

  fetchData: async () => {
    const { filters, pagination } = get();
    set({ loading: true, error: null });

    try {
      const params: FetchPropertiesParams = {
        page: pagination.page.toString(),
        pageSize: pagination.pageSize.toString(),
        name: filters.name || "",
        address: filters.address || "",
        minPrice: filters.minPrice || "",
        maxPrice: filters.maxPrice || "",
      };

      const data = await fetchProperties(params);
      set({ data, loading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'An error occurred', loading: false });
    }
  },

  resetFilters: () => {
    set((state) => ({
      filters: {
        name: '',
        address: '',
        minPrice: '',
        maxPrice: '',
      },
      pagination: { ...state.pagination, page: 1 },
    }));
  },

  initialize: (initialData, params) => {
    set({
      data: initialData,
      filters: {
        name: params.name || '',
        address: params.address || '',
        minPrice: params.minPrice || '',
        maxPrice: params.maxPrice || '',
      },
      pagination: {
        page: parseInt(params.page || '1'),
        pageSize: parseInt(params.pageSize || '12'),
      },
      loading: false,
      error: null,
    });
  },
}));