import { Col, Row } from 'antd';
import { useContext } from 'react';
import { ProductsContext } from '../../context/ProductsContext';
import { Product } from '../../interfaces/productsInterfaces';
import ProductCard from './ProductCard';

const ProductsList = () => {
  const { productsDatabase } =
    useContext(ProductsContext);

  return (
    <Row justify="center" gutter={[16, 16]}>
      {productsDatabase.map((item: Product) => (
        <Row key={item.id}>
          <Col xs={24} sm={12} md={12} lg={8} xl={4} key={item.id}>
            <ProductCard {...item} key={item.id} />
          </Col>
        </Row>
      ))}
    </Row>
  );
};

export default ProductsList;
