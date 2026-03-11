import React from 'react';
import { Typography } from 'antd';
import { IProductDescription } from '../../interfaces/productsInterfaces';
import { currencyFormatter } from '../../utils';

const { Text } = Typography;

const ProductDescription = ({ unitPrice = 0, stock = 0 }: IProductDescription) => (
  <>
    <div style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
      {currencyFormatter({ currency: 'COP', value: unitPrice })}
    </div>
    <div>
      {stock === 0 ? (
        <Text type="danger" style={{ fontSize: 'var(--text-sm)' }}>
          Agotado
        </Text>
      ) : (
        <Text style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
          {stock > 10 ? 'más de 10 en stock' : `${stock} en stock`}
        </Text>
      )}
    </div>
  </>
);

export default ProductDescription;
