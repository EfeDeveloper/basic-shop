import React, { useMemo, useState } from 'react';
import {
  AppstoreOutlined,
  GiftOutlined,
  ShopOutlined,
  CarOutlined,
  ReadOutlined,
  UserOutlined,
  SettingOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { Drawer } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../../api/products';
import { useFiltersStore } from '../../stores/filtersStore';

interface ExploreSidebarProps {
  open?: boolean;
  onClose?: () => void;
}

const ExploreSidebar = ({ open = false, onClose }: ExploreSidebarProps) => {
  const isControlled = onClose != null;
  const drawerVisible = isControlled ? open : false;
  const setDrawerVisible = isControlled ? onClose : () => {};
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.type));
    return Array.from(set).sort();
  }, [products]);
  const { selectedCategories, toggleCategory } = useFiltersStore();

  const navItems = [
    { key: 'categories', label: 'Categorías', icon: AppstoreOutlined, expandable: true },
    { key: 'offers', label: 'Ofertas', icon: GiftOutlined },
    { key: 'sell', label: 'Vender con nosotros', icon: ShopOutlined },
    { key: 'track', label: 'Seguimiento de pedido', icon: CarOutlined },
    { key: 'blog', label: 'Blog', icon: ReadOutlined },
  ];

  const bottomItems = [
    { key: 'account', label: 'Cuenta', icon: UserOutlined },
    { key: 'settings', label: 'Ajustes', icon: SettingOutlined },
  ];

  const sidebarContent = () => (
    <nav className="explore-sidebar-v2">
      <h2 className="explore-sidebar-v2-title">Explore</h2>
      <ul className="explore-sidebar-v2-list">
        {navItems.map((item) => (
          <li key={item.key}>
            {item.expandable ? (
              <>
                <button
                  type="button"
                  className="explore-sidebar-v2-item explore-sidebar-v2-item-categories"
                  onClick={() => setCategoriesOpen(!categoriesOpen)}
                >
                  <item.icon className="explore-sidebar-v2-icon" />
                  <span>{item.label}</span>
                  <RightOutlined
                    className={`explore-sidebar-v2-arrow ${categoriesOpen ? 'open' : ''}`}
                  />
                </button>
                {categoriesOpen && (
                  <ul className="explore-sidebar-v2-categories">
                    {categories.map((cat) => (
                      <li key={cat}>
                        <button
                          type="button"
                          className={`explore-sidebar-v2-cat ${selectedCategories.includes(cat) ? 'active' : ''}`}
                          onClick={() => toggleCategory(cat)}
                        >
                          {cat}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <button type="button" className="explore-sidebar-v2-item">
                <item.icon className="explore-sidebar-v2-icon" />
                <span>{item.label}</span>
              </button>
            )}
          </li>
        ))}
      </ul>
      <div className="explore-sidebar-v2-divider" />
      <ul className="explore-sidebar-v2-list">
        {bottomItems.map((item) => (
          <li key={item.key}>
            <button type="button" className="explore-sidebar-v2-item">
              <item.icon className="explore-sidebar-v2-icon" />
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <>
      <aside className="explore-sidebar-desktop">{sidebarContent()}</aside>
      <Drawer
        title="Menú"
        placement="left"
        onClose={setDrawerVisible}
        open={drawerVisible}
        width={280}
        className="explore-drawer"
      >
        {sidebarContent()}
      </Drawer>
    </>
  );
};

export default ExploreSidebar;
