import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Col, Row, Select, Spin, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { fetchProducts } from '../../api/products';
import { useFiltersStore, type SortBy } from '../../stores/filtersStore';
import { Product } from '../../interfaces/productsInterfaces';
import ProductCard from './ProductCard';

const { Text } = Typography;

const SORT_OPTIONS: { value: SortBy; label: string }[] = [
  { value: 'default', label: 'Ordenar por' },
  { value: 'price_asc', label: 'Precio (menor a mayor)' },
  { value: 'price_desc', label: 'Precio (mayor a menor)' },
  { value: 'rating_desc', label: 'Mejor valorados' },
  { value: 'rating_asc', label: 'Menor valoración' },
];

const ProductsList = () => {
  const { data: products = [], isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const {
    searchText,
    selectedCategories,
    sortBy,
    toggleCategory,
    clearCategories,
    setSortBy,
    clearFilters,
  } = useFiltersStore();

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.type));
    return Array.from(set).sort();
  }, [products]);

  const filtered = useMemo(() => {
    let list = products;
    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (selectedCategories.length > 0) {
      list = list.filter((p) => selectedCategories.includes(p.type));
    }
    const a = [...list];
    if (sortBy === 'price_asc') a.sort((x, y) => x.unit_price - y.unit_price);
    else if (sortBy === 'price_desc') a.sort((x, y) => y.unit_price - x.unit_price);
    else if (sortBy === 'rating_desc') a.sort((x, y) => (y.rating?.rate ?? 0) - (x.rating?.rate ?? 0));
    else if (sortBy === 'rating_asc') a.sort((x, y) => (x.rating?.rate ?? 0) - (y.rating?.rate ?? 0));
    return a;
  }, [products, searchText, selectedCategories, sortBy]);

  if (isLoading) {
    return (
      <div className="products-list-loading">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="products-list-error">
        <Text type="danger">Error al cargar productos: {(error as Error).message}</Text>
      </div>
    );
  }

  const hasActiveFilters = selectedCategories.length > 0;

  return (
    <div className="catalog-layout">
      <div className="catalog-toolbar">
        <div className="catalog-categories">
          <button
            type="button"
            className={`catalog-category-pill ${selectedCategories.length === 0 ? 'active' : ''}`}
            onClick={clearCategories}
          >
            Todas las categorías
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`catalog-category-pill ${selectedCategories.includes(cat) ? 'active' : ''}`}
              onClick={() => toggleCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <Select
          value={sortBy}
          onChange={setSortBy}
          options={SORT_OPTIONS}
          className="catalog-sort-by"
          dropdownClassName="catalog-sort-by-dropdown"
        />
      </div>
      {hasActiveFilters && (
        <div className="products-filters-active">
          <span className="products-filters-active-label">Filtros activos:</span>
          {selectedCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              className="products-filter-chip-active"
              onClick={() => toggleCategory(cat)}
              aria-label={`Quitar filtro ${cat}`}
            >
              {cat}
              <CloseOutlined className="products-filter-chip-close" />
            </button>
          ))}
          <button type="button" className="products-filters-clear" onClick={clearFilters}>
            Limpiar filtros
          </button>
        </div>
      )}
      <Row gutter={[24, 24]} justify="start" className="products-grid">
        {filtered.map((item: Product) => (
          <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
            <ProductCard {...item} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductsList;
