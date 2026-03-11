import React, { useState } from 'react';
import { HeartOutlined, HeartFilled, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Card, Typography } from 'antd';
import AppModal from '../ui/AppModal';
import { useCartStore } from '../../stores/cartStore';
import { useFavoritesStore } from '../../stores/favoritesStore';
import { Product } from '../../interfaces/productsInterfaces';
import ProductDescription from './ProductDescription';
import { currencyFormatter } from '../../utils';

const { Text } = Typography;

const DEFAULT_PLACEHOLDER =
  'https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725052-stock-illustration-image-available-icon-flat-vector.jpg';

const TRUNCATE_LENGTH = 60;

const ProductCard = (product: Product) => {
  const {
    id,
    name,
    description,
    unit_price,
    stock,
    type,
    urlImage,
    initialQuantity,
  } = product;
  const addProduct = useCartStore((s) => s.addProduct);
  const toggleFavorite = useFavoritesStore((s) => s.toggle);
  const isFavorite = useFavoritesStore((s) => s.has(id));
  const [detailOpen, setDetailOpen] = useState(false);
  const placeholder =
    import.meta.env.VITE_PLACEHOLDER_IMAGE ?? DEFAULT_PLACEHOLDER;
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
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(id);
          }}
          onKeyDown={(e) => e.key === 'Enter' && toggleFavorite(id)}
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          {isFavorite ? (
            <HeartFilled className="product-card-favorite-icon filled" />
          ) : (
            <HeartOutlined className="product-card-favorite-icon" />
          )}
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
            <Button
              type="primary"
              size="small"
              icon={<ShoppingCartOutlined />}
              disabled={stock === 0}
              onClick={() => addProduct(product)}
              className="product-card-btn-add product-card-btn-cart"
              aria-label="Añadir al carrito"
            >
              Añadir al carrito
            </Button>
          </div>
        </div>
      </Card>
      <AppModal
        title={null}
        open={detailOpen}
        onCancel={() => setDetailOpen(false)}
        footer={null}
        width={520}
        className="product-detail-modal-v2"
      >
        <div className="product-detail-modal-content">
          <div className="product-detail-modal-image-wrap">
            <img src={image} alt={name} className="product-detail-modal-image" />
          </div>
          <div className="product-detail-modal-meta">
            <h2 className="product-detail-modal-name">{name}</h2>
            <div className="product-detail-modal-price">
              {currencyFormatter({ currency: 'COP', value: unit_price })}
            </div>
            <Text type="secondary" className="product-detail-modal-type">
              {type}
            </Text>
            {description ? (
              <p className="product-detail-modal-description">{description}</p>
            ) : (
              <Text type="secondary">Sin descripción.</Text>
            )}
            <div className="product-detail-modal-footer">
              <Button
                type="primary"
                size="small"
                icon={<ShoppingCartOutlined />}
                disabled={stock === 0}
                onClick={() => {
                  addProduct(product);
                  setDetailOpen(false);
                }}
                className="product-card-btn-add product-card-btn-cart"
                aria-label="Añadir al carrito"
              >
                Añadir al carrito
              </Button>
            </div>
          </div>
        </div>
      </AppModal>
    </>
  );
};

export default ProductCard;
