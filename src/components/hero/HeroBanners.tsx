import React from 'react';

const HeroBanners = () => (
  <section className="hero-banners">
    <div className="hero-banner hero-banner-left">
      <div className="hero-banner-content">
        <span className="hero-banner-tag">Ofertas especiales</span>
        <h2 className="hero-banner-title">Hasta 35% OFF</h2>
        <p className="hero-banner-desc">En productos seleccionados. Envío gratis en pedidos mayores.</p>
      </div>
    </div>
    <div className="hero-banner hero-banner-right">
      <div className="hero-banner-content">
        <span className="hero-banner-tag hero-banner-tag-sale">Envío gratis</span>
        <h2 className="hero-banner-title">En tu primera compra</h2>
        <p className="hero-banner-desc">Código: LUMA15</p>
      </div>
    </div>
  </section>
);

export default HeroBanners;
