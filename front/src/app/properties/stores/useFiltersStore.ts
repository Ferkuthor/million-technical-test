import { create } from 'zustand';

interface Filters {
  name: string;
  address: string;
  minPrice: string;
  maxPrice: string;
}

interface FiltersStore {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  updateFilter: (key: keyof Filters, value: string) => void;
  resetFilters: () => void;
}

export const useFiltersStore = create<FiltersStore>((set) => ({
  filters: {
    name: '',
    address: '',
    minPrice: '',
    maxPrice: '',
  },
  setFilters: (filters) => set({ filters }),
  updateFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),
  resetFilters: () =>
    set({
      filters: {
        name: '',
        address: '',
        minPrice: '',
        maxPrice: '',
      },
    }),
}));