import React from 'react';
import {
  GiftOutlined,
  ShopOutlined,
  CarOutlined,
  ReadOutlined,
  UserOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Drawer } from 'antd';

interface ExploreSidebarProps {
  open?: boolean;
  onClose?: () => void;
}

const navItems = [
  { key: 'offers', label: 'Ofertas', icon: GiftOutlined },
  { key: 'sell', label: 'Vender con nosotros', icon: ShopOutlined },
  { key: 'track', label: 'Seguimiento de pedido', icon: CarOutlined },
  { key: 'blog', label: 'Blog', icon: ReadOutlined },
];

const bottomItems = [
  { key: 'account', label: 'Cuenta', icon: UserOutlined },
  { key: 'settings', label: 'Ajustes', icon: SettingOutlined },
];

const ExploreSidebar = ({ open = false, onClose }: ExploreSidebarProps) => {
  const isControlled = onClose != null;
  const drawerVisible = isControlled ? open : false;
  const setDrawerVisible = isControlled ? onClose : () => {};

  const sidebarContent = () => (
    <nav className="explore-sidebar-v2">
      <div>
        <h2 className="explore-sidebar-v2-title">Explore</h2>
        <ul className="explore-sidebar-v2-list">
          {navItems.map((item) => (
            <li key={item.key}>
              <button type="button" className="explore-sidebar-v2-item">
                <item.icon className="explore-sidebar-v2-icon" />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="explore-sidebar-v2-bottom">
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
      </div>
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
        className="explore-drawer app-drawer"
      >
        {sidebarContent()}
      </Drawer>
    </>
  );
};

export default ExploreSidebar;
