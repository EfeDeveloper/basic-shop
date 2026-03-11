import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../interfaces/productsInterfaces';
import { exportDataToJSON, fechaYHoraActual } from '../utils';

interface CartItem extends Product {}

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  totalValue: number;
  countProducts: number;
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  emptyCart: () => void;
  toggleDrawer: () => void;
  createOrderExport: () => void;
}

function recalcTotals(items: CartItem[]) {
  const countProducts = items.reduce((s, i) => s + i.initialQuantity, 0);
  const totalValue = items.reduce((s, i) => s + i.unit_price * i.initialQuantity, 0);
  return { countProducts, totalValue };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
  items: [],
  isDrawerOpen: false,
  totalValue: 0,
  countProducts: 0,

  addProduct: (product: Product) => {
    set((state) => {
      const existing = state.items.find((i) => i.id === product.id);
      let next: CartItem[];
      if (existing) {
        next = state.items.map((i) =>
          i.id === product.id
            ? { ...i, initialQuantity: i.initialQuantity + product.initialQuantity }
            : i
        );
      } else {
        next = [...state.items, { ...product }];
      }
      const { countProducts, totalValue } = recalcTotals(next);
      return { items: next, countProducts, totalValue };
    });
  },

  removeProduct: (product: Product) => {
    set((state) => {
      const next = state.items.filter((i) => i.id !== product.id);
      const { countProducts, totalValue } = recalcTotals(next);
      return { items: next, countProducts, totalValue };
    });
  },

  increaseQuantity: (productId: number) => {
    set((state) => {
      const next = state.items.map((i) =>
        i.id === productId ? { ...i, initialQuantity: i.initialQuantity + 1 } : i
      );
      const { countProducts, totalValue } = recalcTotals(next);
      return { items: next, countProducts, totalValue };
    });
  },

  decreaseQuantity: (productId: number) => {
    set((state) => {
      const item = state.items.find((i) => i.id === productId);
      if (!item) return state;
      if (item.initialQuantity <= 1) {
        const next = state.items.filter((i) => i.id !== productId);
        const { countProducts, totalValue } = recalcTotals(next);
        return { items: next, countProducts, totalValue };
      }
      const next = state.items.map((i) =>
        i.id === productId ? { ...i, initialQuantity: i.initialQuantity - 1 } : i
      );
      const { countProducts, totalValue } = recalcTotals(next);
      return { items: next, countProducts, totalValue };
    });
  },

  emptyCart: () => set({ items: [], totalValue: 0, countProducts: 0 }),

  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),

  createOrderExport: () => {
    const { items, countProducts, totalValue } = get();
    const productOrder = items.map((item) => ({
      'nombre del producto': item.name,
      type: item.type,
      cantidad: item.initialQuantity,
      'valor unitario': item.unit_price,
      'valor total': item.unit_price * item.initialQuantity,
    }));
    const orderToDownload = {
      ...productOrder,
      'fecha y hora de compra': fechaYHoraActual(),
      'total productos': countProducts,
      'total a pagar': totalValue,
    };
    exportDataToJSON(orderToDownload);
  },
    }),
    {
      name: 'luma-cart',
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          const { countProducts, totalValue } = recalcTotals(state.items);
          state.countProducts = countProducts;
          state.totalValue = totalValue;
        }
      },
    }
  )
);
