import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Col, Row, Spin, Typography } from 'antd';
import { useMemo } from 'react';
import { fetchProducts } from '../../api/products';
import { useFiltersStore } from '../../stores/filtersStore';
import { Product } from '../../interfaces/productsInterfaces';
import ProductCard from './ProductCard';

const { Text } = Typography;

const ProductsList = () => {
  const { data: products = [], isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const { searchText, selectedCategories } = useFiltersStore();

  const filtered = useMemo(() => {
    let list = products;
    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (selectedCategories.length > 0) {
      list = list.filter((p) => selectedCategories.includes(p.type));
    }
    return list;
  }, [products, searchText, selectedCategories]);

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

  return (
    <Row gutter={[24, 24]} justify="start" className="products-grid">
      {filtered.map((item: Product) => (
        <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
          <ProductCard {...item} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductsList;
