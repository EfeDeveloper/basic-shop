import React from 'react';
import { IProductDescription } from '../../interfaces/productsInterfaces';
import { currencyFormatter } from '../../utils';

const ProductDescription = ({ unitPrice = 0, stock = 0 }: IProductDescription) => (
  <>
    <div className="product-desc-price">
      {currencyFormatter({ currency: 'COP', value: unitPrice })}
    </div>
    <div className={`product-desc-stock ${stock === 0 ? 'product-desc-stock--out' : ''}`}>
      {stock === 0
        ? 'Agotado'
        : stock > 10
        ? 'más de 10 en stock'
        : `${stock} en stock`}
    </div>
  </>
);

export default ProductDescription;
