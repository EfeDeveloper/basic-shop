import React, { useState } from 'react';
import {
  BellOutlined,
  HeartOutlined,
  MenuOutlined,
  SearchOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import { Badge, Button, Dropdown, Input, Layout } from 'antd';
import { useCartStore } from '../../stores/cartStore';
import { useFavoritesStore } from '../../stores/favoritesStore';
import { useFiltersStore } from '../../stores/filtersStore';

const { Header } = Layout;

interface HeaderShopProps {
  onOpenSidebar?: () => void;
}

const HeaderShop = ({ onOpenSidebar }: HeaderShopProps) => {
  const countProducts = useCartStore((s) => s.countProducts);
  const toggleDrawer = useCartStore((s) => s.toggleDrawer);
  const favoriteIds = useFavoritesStore((s) => s.ids);
  const { searchText, setSearchText } = useFiltersStore();
  const [notifOpen, setNotifOpen] = useState(false);

  const notifMenu = {
    items: [
      {
        key: 'empty',
        label: (
          <div className="header-notif-empty">
            <BellOutlined style={{ fontSize: 24, color: 'var(--color-text-secondary)' }} />
            <span>No hay notificaciones</span>
          </div>
        ),
        disabled: true,
      },
    ],
  };

  return (
    <Header className="header-shop">
      {onOpenSidebar && (
        <Button
          type="text"
          className="header-icon-btn sidebar-toggle-mobile"
          icon={<MenuOutlined />}
          onClick={onOpenSidebar}
          aria-label="Abrir menú"
        />
      )}
      <div className="header-logo">Luma</div>
      <div className="header-search-wrap">
        <Input
          placeholder="Buscar productos..."
          prefix={<SearchOutlined className="header-search-icon" />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
          className="header-search-input"
        />
      </div>
      <div className="header-actions">
        <Dropdown
          menu={notifMenu}
          trigger={['click']}
          open={notifOpen}
          onOpenChange={setNotifOpen}
          placement="bottomRight"
        >
          <Button
            type="text"
            className="header-icon-btn"
            icon={<BellOutlined />}
            onClick={() => setNotifOpen(!notifOpen)}
            aria-label="Notificaciones"
          />
        </Dropdown>
        <Badge count={favoriteIds.length} offset={[-4, 4]}>
          <Button
            type="text"
            className="header-icon-btn"
            icon={<HeartOutlined />}
            aria-label="Favoritos"
          />
        </Badge>
        <Badge count={countProducts} offset={[-4, 4]}>
          <Button
            type="text"
            className="header-icon-btn header-cart-btn"
            icon={<ShoppingOutlined />}
            onClick={toggleDrawer}
            aria-label="Carrito"
          />
        </Badge>
      </div>
    </Header>
  );
};

export default HeaderShop;
