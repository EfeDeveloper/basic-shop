import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProductCard from './ProductCard';

const mockAddProduct = vi.fn();

vi.mock('../../stores/cartStore', () => ({
  useCartStore: (selector: (s: unknown) => unknown) =>
    selector({ addProduct: mockAddProduct }),
}));

const defaultProduct = {
  id: 1,
  name: 'Test Product',
  unit_price: 100,
  stock: 5,
  type: 'electronics',
  urlImage: 'https://example.com/img.jpg',
  initialQuantity: 1,
};

describe('ProductCard', () => {
  beforeEach(() => {
    mockAddProduct.mockClear();
  });

  it('renders product name and add to cart button', () => {
    render(<ProductCard {...defaultProduct} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /añadir al carrito/i })).toBeInTheDocument();
  });

  it('disables add button when stock is 0', () => {
    render(<ProductCard {...defaultProduct} stock={0} />);
    const btn = screen.getByRole('button', { name: /añadir al carrito/i });
    expect(btn).toBeDisabled();
  });

  it('calls addProduct when clicking add to cart', () => {
    render(<ProductCard {...defaultProduct} />);
    fireEvent.click(screen.getByRole('button', { name: /añadir al carrito/i }));
    expect(mockAddProduct).toHaveBeenCalledTimes(1);
    expect(mockAddProduct).toHaveBeenCalledWith(defaultProduct);
  });
});
