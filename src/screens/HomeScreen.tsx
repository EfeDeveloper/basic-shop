import React, { useState } from 'react';
import { Layout, Typography } from 'antd';
import CartDrawer from '../components/drawer/CartDawer';
import HeaderShop from '../components/header/HeaderShop';
import ExploreSidebar from '../components/sidebar/ExploreSidebar';
import HeroSlider from '../components/hero/HeroSlider';
import ProductsList from '../components/products/ProductsList';

const { Content, Footer } = Layout;
const { Text } = Typography;

const CREATED_YEAR = 2023;

const HomeScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentYear = new Date().getFullYear();
  const yearRange =
    currentYear > CREATED_YEAR ? `${CREATED_YEAR}–${currentYear}` : String(CREATED_YEAR);

  return (
    <Layout className="app-layout">
      <HeaderShop onOpenSidebar={() => setSidebarOpen(true)} />
      <Layout className="app-body">
        <ExploreSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <Content className="app-content">
          <HeroSlider />
          <section className="products-section">
            <div className="products-section-header">
              <h2 className="products-section-title">Productos destacados</h2>
            </div>
            <ProductsList />
          </section>
        </Content>
      </Layout>
      <Footer className="app-footer">
        <Text className="footer-text">
          Luma © {yearRange} · Created by EdFer
        </Text>
      </Footer>
      <CartDrawer />
    </Layout>
  );
};

export default HomeScreen;
