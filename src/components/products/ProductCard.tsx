import React, { useState } from 'react';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Card, Typography } from 'antd';
import { useFavoritesStore } from '../../stores/favoritesStore';
import { Product } from '../../interfaces/productsInterfaces';
import ProductDescription from './ProductDescription';
import ProductDetailModal from './ProductDetailModal';
import AddToCartButton from '../ui/AddToCartButton';

const { Text } = Typography;

const DEFAULT_PLACEHOLDER =
  'https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725052-stock-illustration-image-available-icon-flat-vector.jpg';

const TRUNCATE_LENGTH = 60;

const ProductCard = (product: Product) => {
  const { id, name, description, unit_price, stock, urlImage } = product;
  const toggleFavorite = useFavoritesStore((s) => s.toggle);
  const isFavorite = useFavoritesStore((s) => s.has(id));
  const [detailOpen, setDetailOpen] = useState(false);
  const placeholder = import.meta.env.VITE_PLACEHOLDER_IMAGE ?? DEFAULT_PLACEHOLDER;
  const image = urlImage ?? placeholder;
  const truncated =
    description && description.length > TRUNCATE_LENGTH
      ? `${description.slice(0, TRUNCATE_LENGTH).trim()}…`
      : description ?? null;

  return (
    <>
      <Card
        hoverable
        className="product-card product-card-v2"
        onClick={() => setDetailOpen(true)}
        style={{ cursor: 'pointer' }}
      >
        <div
          className="product-card-favorite"
          role="button"
          tabIndex={0}
          onClick={(e) => { e.stopPropagation(); toggleFavorite(id); }}
          onKeyDown={(e) => e.key === 'Enter' && toggleFavorite(id)}
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          {isFavorite
            ? <HeartFilled className="product-card-favorite-icon filled" />
            : <HeartOutlined className="product-card-favorite-icon" />}
        </div>
        <div className="product-img-card-container">
          <img className="product-img-card" alt={name} src={image} />
        </div>
        <div className="product-card-body-v2">
          <h3 className="product-card-name">{name}</h3>
          <ProductDescription unitPrice={unit_price} stock={stock} />
          {truncated && (
            <Text type="secondary" className="product-card-desc-preview" ellipsis>
              {truncated}
            </Text>
          )}
          <div className="product-card-actions-v2" onClick={(e) => e.stopPropagation()}>
            <AddToCartButton product={product} size="small" />
          </div>
        </div>
      </Card>

      <ProductDetailModal
        product={detailOpen ? product : null}
        onClose={() => setDetailOpen(false)}
      />
    </>
  );
};

export default ProductCard;
