import { PlusOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import { useContext } from 'react';
import { ProductsContext } from '../../context/ProductsContext';
import { Product } from '../../interfaces/productsInterfaces';
import ProductDescription from './ProductDescription';

const { Meta } = Card;

const ProductCard = ({
  id,
  name,
  unit_price,
  stock,
  type,
  urlImage,
  initialQuantity,
}: Product) => {
  const { onAddProduct } = useContext(ProductsContext);

  const image = urlImage
    ? urlImage
    : 'https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725052-stock-illustration-image-available-icon-flat-vector.jpg';

  return (
    <div>
      <Card
        hoverable
        style={{ width: 200, margin: 20 }}
        cover={
          <div className="product-img-card-container">
            <img
              className="product-img-card"
              alt={name}
              src={image}
              style={{ width: 200, height: 200 }}
            />
          </div>
        }
        actions={[
          <Button
            type="primary"
            disabled={stock === 0}
            icon={<PlusOutlined key={id} />}
            onClick={() =>
              onAddProduct({
                id,
                name,
                unit_price,
                stock,
                type,
                urlImage,
                initialQuantity,
              })
            }
          >
            Agregar al carrito
          </Button>,
        ]}
      >
        <Meta
          title={name}
          description={<ProductDescription unitPrice={unit_price} stock={stock} />}
        />
      </Card>
    </div>
  );
};

export default ProductCard;
