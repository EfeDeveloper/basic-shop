import { create } from 'zustand';

interface FiltersState {
  searchText: string;
  selectedCategories: string[];
  setSearchText: (text: string) => void;
  toggleCategory: (category: string) => void;
  clearFilters: () => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
  searchText: '',
  selectedCategories: [],

  setSearchText: (text: string) => set({ searchText: text }),

  toggleCategory: (category: string) =>
    set((state) => ({
      selectedCategories: state.selectedCategories.includes(category)
        ? state.selectedCategories.filter((c) => c !== category)
        : [...state.selectedCategories, category],
    })),

  clearFilters: () => set({ searchText: '', selectedCategories: [] }),
}));
