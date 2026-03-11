import React from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useCartStore } from '../../stores/cartStore';
import { Product } from '../../interfaces/productsInterfaces';

interface AddToCartButtonProps {
  product: Product;
  size?: 'small' | 'middle';
  iconOnly?: boolean;
  onClick?: () => void;
}

const AddToCartButton = ({ product, size = 'middle', iconOnly = false, onClick }: AddToCartButtonProps) => {
  const addProduct = useCartStore((s) => s.addProduct);

  const handleClick = () => {
    addProduct(product);
    onClick?.();
  };

  return (
    <Button
      type="primary"
      size={size}
      icon={<ShoppingCartOutlined />}
      disabled={product.stock === 0}
      onClick={handleClick}
      className="btn-add-to-cart"
      aria-label="Añadir al carrito"
    >
      {!iconOnly && 'Añadir al carrito'}
    </Button>
  );
};

export default AddToCartButton;
