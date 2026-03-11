import React, { useState } from 'react';
import { Avatar, Button, Drawer, Empty, Tag } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { DeleteOutlined } from '@ant-design/icons';
import { useFavoritesStore } from '../../stores/favoritesStore';
import { fetchProducts } from '../../api/products';
import { currencyFormatter } from '../../utils';
import { Product } from '../../interfaces/productsInterfaces';
import ProductDetailModal from '../products/ProductDetailModal';
import AddToCartButton from '../ui/AddToCartButton';

const DEFAULT_PLACEHOLDER =
  'https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725052-stock-illustration-image-available-icon-flat-vector.jpg';

const FavoritesDrawer = () => {
  const { ids, isDrawerOpen, toggleDrawer, toggle } = useFavoritesStore();
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const favorites = products.filter((p) => ids.includes(p.id));

  return (
    <>
      <Drawer
        title="Favoritos"
        placement="right"
        onClose={toggleDrawer}
        open={isDrawerOpen}
        width={380}
        className="fav-drawer app-drawer"
      >
        {favorites.length === 0 ? (
          <div className="fav-drawer-empty">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="No tienes favoritos aún"
            />
          </div>
        ) : (
          <div className="fav-drawer-list">
            {favorites.map((product) => {
              const image = product.urlImage ?? DEFAULT_PLACEHOLDER;
              return (
                <div
                  key={product.id}
                  className="fav-drawer-item"
                  role="button"
                  tabIndex={0}
                  onClick={() => setDetailProduct(product)}
                  onKeyDown={(e) => e.key === 'Enter' && setDetailProduct(product)}
                >
                  <Avatar
                    src={image}
                    alt={product.name}
                    shape="square"
                    className="fav-drawer-item-img"
                  />
                  <div className="fav-drawer-item-body">
                    <Tag className="fav-drawer-item-tag">{product.type}</Tag>
                    <div className="fav-drawer-item-name">{product.name}</div>
                    <div className="fav-drawer-item-price">
                      {currencyFormatter({ currency: 'COP', value: product.unit_price })}
                    </div>
                    <div
                      className="fav-drawer-item-actions"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <AddToCartButton product={product} size="small" />
                      <Button
                        type="text"
                        danger
                        size="small"
                        icon={<DeleteOutlined />}
                        onClick={() => toggle(product.id)}
                        aria-label="Quitar de favoritos"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Drawer>

      <ProductDetailModal
        product={detailProduct}
        onClose={() => setDetailProduct(null)}
      />
    </>
  );
};

export default FavoritesDrawer;
