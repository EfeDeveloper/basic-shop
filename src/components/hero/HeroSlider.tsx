import React, { useMemo, useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Carousel, Spin } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../../api/products';
import { currencyFormatter } from '../../utils';

const SLIDER_LIMIT = 4;

function shuffleAndTake<T>(arr: T[], count: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const carouselRef = React.useRef<any>(null);
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
  const slides = useMemo(
    () => (products.length <= SLIDER_LIMIT ? products : shuffleAndTake(products, SLIDER_LIMIT)),
    [products]
  );

  if (isLoading) {
    return (
      <section className="hero-slider-wrap hero-slider-compact">
        <div className="hero-slider-loading">
          <Spin size="large" />
        </div>
      </section>
    );
  }

  if (slides.length === 0) return null;

  return (
    <section className="hero-slider-wrap hero-slider-compact">
      <button
        type="button"
        className="hero-slider-arrow hero-slider-arrow-prev"
        onClick={() => carouselRef.current?.prev()}
        aria-label="Anterior"
      >
        <LeftOutlined />
      </button>
      <Carousel
        ref={carouselRef}
        afterChange={setCurrent}
        dots={false}
        className="hero-slider"
        autoplay
      >
        {slides.map((product) => (
          <div key={product.id}>
            <div
              className="hero-slide hero-slide-product"
              style={{ backgroundImage: `url(${product.urlImage})` }}
            >
              <div className="hero-slide-overlay" />
              <div className="hero-slide-product-content">
                <h2 className="hero-slide-product-title">{product.name}</h2>
                <p className="hero-slide-product-price">
                  {currencyFormatter({ currency: 'COP', value: product.unit_price })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
      <button
        type="button"
        className="hero-slider-arrow hero-slider-arrow-next"
        onClick={() => carouselRef.current?.next()}
        aria-label="Siguiente"
      >
        <RightOutlined />
      </button>
      <div className="hero-slider-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`hero-slider-dot ${i === current ? 'active' : ''}`}
            onClick={() => carouselRef.current?.goTo(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
