import { create } from 'zustand';

interface FavoritesState {
  ids: number[];
  toggle: (productId: number) => void;
  has: (productId: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  ids: [],

  toggle: (productId: number) => {
    set((state) => ({
      ids: state.ids.includes(productId)
        ? state.ids.filter((id) => id !== productId)
        : [...state.ids, productId],
    }));
  },

  has: (productId: number) => get().ids.includes(productId),
}));
