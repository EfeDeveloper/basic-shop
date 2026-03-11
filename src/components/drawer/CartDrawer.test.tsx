import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CartDrawer from './CartDrawer';

vi.mock('../../stores/cartStore', () => ({
  useCartStore: () => ({
    items: [],
    totalValue: 0,
    countProducts: 0,
    isDrawerOpen: true,
    toggleDrawer: vi.fn(),
    removeProduct: vi.fn(),
    increaseQuantity: vi.fn(),
    decreaseQuantity: vi.fn(),
    emptyCart: vi.fn(),
    createOrderExport: vi.fn(),
  }),
}));

describe('CartDrawer', () => {
  it('shows empty state when no items', () => {
    render(<CartDrawer />);
    expect(screen.getByText(/tu carrito está vacío/i)).toBeInTheDocument();
    expect(screen.getByText(/añade productos desde el catálogo/i)).toBeInTheDocument();
  });
});
