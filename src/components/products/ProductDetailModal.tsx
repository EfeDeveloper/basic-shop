import React from 'react';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Button, Tag } from 'antd';
import AppModal from '../ui/AppModal';
import AddToCartButton from '../ui/AddToCartButton';
import { useFavoritesStore } from '../../stores/favoritesStore';
import { Product } from '../../interfaces/productsInterfaces';

const DEFAULT_PLACEHOLDER =
  'https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725052-stock-illustration-image-available-icon-flat-vector.jpg';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart?: () => void;
}

const ProductDetailModal = ({ product, onClose, onAddToCart }: ProductDetailModalProps) => {
  const isFavorite = useFavoritesStore((s) => (product ? s.has(product.id) : false));
  const toggleFavorite = useFavoritesStore((s) => s.toggle);

  if (!product) return null;

  const image = product.urlImage ?? DEFAULT_PLACEHOLDER;
  const inStock = product.stock > 0;

  return (
    <AppModal
      title={null}
      open
      onCancel={onClose}
      footer={null}
      width={560}
      className="product-detail-modal"
    >
      <div className="pdm-content">
        <div className="pdm-image-col">
          <img src={image} alt={product.name} className="pdm-image" />
        </div>
        <div className="pdm-info-col">
          <Tag className="pdm-category">{product.type}</Tag>
          <h2 className="pdm-name">{product.name}</h2>
          <p className="pdm-price">
            {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(product.unit_price)}
          </p>
          <p className={`pdm-stock ${inStock ? 'pdm-stock--in' : 'pdm-stock--out'}`}>
            {product.stock === 0
              ? 'Agotado'
              : product.stock > 10
              ? 'Más de 10 en stock'
              : `${product.stock} en stock`}
          </p>
          {product.description && (
            <p className="pdm-description">{product.description}</p>
          )}
          <div className="pdm-actions">
            <Button
              size="middle"
              icon={isFavorite ? <HeartFilled /> : <HeartOutlined />}
              onClick={() => toggleFavorite(product.id)}
              className={`pdm-fav-btn ${isFavorite ? 'pdm-fav-btn--active' : ''}`}
              aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            >
              {isFavorite ? 'En favoritos' : 'Favorito'}
            </Button>
            <AddToCartButton
              product={product}
              size="middle"
              onClick={onAddToCart}
            />
          </div>
        </div>
      </div>
    </AppModal>
  );
};

export default ProductDetailModal;
