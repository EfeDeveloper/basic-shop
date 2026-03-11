import React from 'react';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useFavoritesStore } from '../../stores/favoritesStore';

interface FavoriteButtonProps {
  productId: number;
  size?: 'small' | 'middle';
}

const FavoriteButton = ({ productId, size = 'middle' }: FavoriteButtonProps) => {
  const isFavorite = useFavoritesStore((s) => s.has(productId));
  const toggle = useFavoritesStore((s) => s.toggle);

  return (
    <Button
      size={size}
      danger={isFavorite}
      icon={isFavorite ? <HeartFilled /> : <HeartOutlined />}
      onClick={() => toggle(productId)}
      className="btn-favorite"
      aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
    />
  );
};

export default FavoriteButton;
