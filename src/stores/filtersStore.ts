import { create } from 'zustand';

export type SortBy =
  | 'default'
  | 'price_asc'
  | 'price_desc'
  | 'rating_desc'
  | 'rating_asc';

interface FiltersState {
  searchText: string;
  selectedCategories: string[];
  sortBy: SortBy;
  setSearchText: (text: string) => void;
  toggleCategory: (category: string) => void;
  clearCategories: () => void;
  setSortBy: (sort: SortBy) => void;
  clearFilters: () => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
  searchText: '',
  selectedCategories: [],
  sortBy: 'default',

  setSearchText: (text: string) => set({ searchText: text }),

  toggleCategory: (category: string) =>
    set((state) => ({
      selectedCategories: state.selectedCategories.includes(category)
        ? state.selectedCategories.filter((c) => c !== category)
        : [...state.selectedCategories, category],
    })),

  clearCategories: () => set({ selectedCategories: [] }),

  setSortBy: (sort: SortBy) => set({ sortBy: sort }),

  clearFilters: () =>
    set({ searchText: '', selectedCategories: [], sortBy: 'default' }),
}));
