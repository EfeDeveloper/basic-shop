import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi } from 'vitest';
import HomeScreen from './HomeScreen';

vi.mock('../components/header/HeaderShop', () => ({
  default: () => <div data-testid="header">Header</div>,
}));
vi.mock('../components/products/ProductsList', () => ({
  default: () => <div data-testid="products-list">ProductsList</div>,
}));
vi.mock('../components/drawer/CartDawer', () => ({
  default: () => <div data-testid="cart-drawer">CartDrawer</div>,
}));
vi.mock('../components/sidebar/ExploreSidebar', () => ({
  default: () => <div data-testid="sidebar">Sidebar</div>,
}));
vi.mock('../components/hero/HeroSlider', () => ({
  default: () => <div data-testid="hero-slider">Hero</div>,
}));

function wrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <HomeScreen />
    </QueryClientProvider>
  );
}

describe('HomeScreen', () => {
  it('renders header, sidebar, products list and footer', () => {
    render(wrapper());
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('products-list')).toBeInTheDocument();
    expect(screen.getByTestId('cart-drawer')).toBeInTheDocument();
    expect(screen.getByText(/Productos destacados/i)).toBeInTheDocument();
    expect(screen.getByText(/Luma/)).toBeInTheDocument();
  });
});
