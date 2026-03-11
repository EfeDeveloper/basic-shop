import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  ids: number[];
  isDrawerOpen: boolean;
  toggle: (productId: number) => void;
  has: (productId: number) => boolean;
  toggleDrawer: () => void;
  openDrawer: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      ids: [],
      isDrawerOpen: false,

      toggle: (productId: number) => {
        set((state) => ({
          ids: state.ids.includes(productId)
            ? state.ids.filter((id) => id !== productId)
            : [...state.ids, productId],
        }));
      },

      has: (productId: number) => get().ids.includes(productId),

      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),

      openDrawer: () => set({ isDrawerOpen: true }),
    }),
    {
      name: 'luma-favorites',
      partialize: (state) => ({ ids: state.ids }),
    }
  )
);
