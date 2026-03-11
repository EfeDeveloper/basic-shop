import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Search from './Search';

const mockSetSearchText = vi.fn();
const mockToggleCategory = vi.fn();

vi.mock('../../stores/filtersStore', () => ({
  useFiltersStore: () => ({
    searchText: '',
    setSearchText: mockSetSearchText,
    selectedCategories: [],
    toggleCategory: mockToggleCategory,
  }),
}));

vi.mock('@tanstack/react-query', () => ({
  useQuery: () => ({
    data: [
      { id: 1, type: 'electronics', name: 'Phone' },
      { id: 2, type: 'jewelery', name: 'Ring' },
    ],
    isLoading: false,
    isError: false,
  }),
}));

describe('Search', () => {
  beforeEach(() => {
    mockSetSearchText.mockClear();
    mockToggleCategory.mockClear();
  });

  it('renders search input', () => {
    render(<Search />);
    expect(screen.getByPlaceholderText(/buscar producto/i)).toBeInTheDocument();
  });

  it('calls setSearchText when typing', () => {
    render(<Search />);
    fireEvent.change(screen.getByPlaceholderText(/buscar producto/i), {
      target: { value: 'test' },
    });
    expect(mockSetSearchText).toHaveBeenCalledWith('test');
  });
});
