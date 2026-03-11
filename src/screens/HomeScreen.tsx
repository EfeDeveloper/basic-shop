import React, { useState } from 'react';
import { Layout } from 'antd';
import {
  InstagramOutlined,
  TwitterOutlined,
  FacebookOutlined,
  YoutubeOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  SafetyCertificateOutlined,
  CarOutlined,
  RedoOutlined,
  CustomerServiceOutlined,
} from '@ant-design/icons';
import CartDrawer from '../components/drawer/CartDrawer';
import FavoritesDrawer from '../components/drawer/FavoritesDrawer';
import HeaderShop from '../components/header/HeaderShop';
import ExploreSidebar from '../components/sidebar/ExploreSidebar';
import HeroSlider from '../components/hero/HeroSlider';
import ProductsList from '../components/products/ProductsList';

const { Content } = Layout;

const CREATED_YEAR = 2023;

const footerLinks = {
  shop: ['Todos los productos', 'Ofertas', 'Novedades', 'Más vendidos', 'Marcas'],
  help: ['Centro de ayuda', 'Cómo comprar', 'Envíos y entregas', 'Devoluciones', 'Garantías'],
  company: ['Sobre nosotros', 'Blog', 'Trabaja con nosotros', 'Sostenibilidad', 'Prensa'],
};

const perks = [
  { icon: CarOutlined, title: 'Envío gratis', desc: 'En pedidos mayores a $50' },
  { icon: RedoOutlined, title: 'Devolución fácil', desc: '30 días sin preguntas' },
  { icon: SafetyCertificateOutlined, title: 'Pago seguro', desc: 'Encriptación SSL' },
  { icon: CustomerServiceOutlined, title: 'Soporte 24/7', desc: 'Siempre disponible' },
];

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

      <footer className="site-footer">
        {/* Perks bar */}
        <div className="footer-perks">
          <div className="footer-perks-inner">
            {perks.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="footer-perk">
                <Icon className="footer-perk-icon" />
                <div>
                  <span className="footer-perk-title">{title}</span>
                  <span className="footer-perk-desc">{desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main footer */}
        <div className="footer-main">
          <div className="footer-main-inner">
            {/* Brand */}
            <div className="footer-brand">
              <span className="footer-brand-logo">Luma</span>
              <p className="footer-brand-tagline">
                Tu tienda de confianza para encontrar los mejores productos al mejor precio.
              </p>
              <div className="footer-social">
                <a href="#" className="footer-social-link" aria-label="Instagram"><InstagramOutlined /></a>
                <a href="#" className="footer-social-link" aria-label="Twitter"><TwitterOutlined /></a>
                <a href="#" className="footer-social-link" aria-label="Facebook"><FacebookOutlined /></a>
                <a href="#" className="footer-social-link" aria-label="YouTube"><YoutubeOutlined /></a>
              </div>
            </div>

            {/* Links */}
            <div className="footer-col">
              <h4 className="footer-col-title">Tienda</h4>
              <ul className="footer-col-list">
                {footerLinks.shop.map((l) => <li key={l}><a href="#" className="footer-col-link">{l}</a></li>)}
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="footer-col-title">Ayuda</h4>
              <ul className="footer-col-list">
                {footerLinks.help.map((l) => <li key={l}><a href="#" className="footer-col-link">{l}</a></li>)}
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="footer-col-title">Empresa</h4>
              <ul className="footer-col-list">
                {footerLinks.company.map((l) => <li key={l}><a href="#" className="footer-col-link">{l}</a></li>)}
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-col">
              <h4 className="footer-col-title">Contacto</h4>
              <ul className="footer-contact-list">
                <li><MailOutlined className="footer-contact-icon" /><span>hola@luma.shop</span></li>
                <li><PhoneOutlined className="footer-contact-icon" /><span>+57 300 000 0000</span></li>
                <li><EnvironmentOutlined className="footer-contact-icon" /><span>Bogotá, Colombia</span></li>
              </ul>
              <div className="footer-newsletter">
                <p className="footer-newsletter-label">Suscríbete a nuestras novedades</p>
                <div className="footer-newsletter-form">
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    className="footer-newsletter-input"
                  />
                  <button type="button" className="footer-newsletter-btn">
                    <MailOutlined />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-inner">
            <span className="footer-bottom-copy">
              © {yearRange} Luma · Hecho con ❤️ por EdFer
            </span>
            <div className="footer-payment-methods">
              <span className="footer-payment-label">Métodos de pago:</span>
              <span className="footer-payment-badge">Visa</span>
              <span className="footer-payment-badge">Mastercard</span>
              <span className="footer-payment-badge">PayPal</span>
              <span className="footer-payment-badge">PSE</span>
              <span className="footer-payment-badge">Nequi</span>
            </div>
            <div className="footer-bottom-links">
              <a href="#" className="footer-bottom-link">Privacidad</a>
              <a href="#" className="footer-bottom-link">Términos</a>
              <a href="#" className="footer-bottom-link">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      <CartDrawer />
      <FavoritesDrawer />
    </Layout>
  );
};

export default HomeScreen;
