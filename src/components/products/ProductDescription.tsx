import { Typography } from 'antd';
import { IProductDescription } from '../../interfaces/productsInterfaces';
import { currencyFormatter } from '../../utils';

const { Text } = Typography;

const ProductDescription = ({ unitPrice = 0, stock = 0 }: IProductDescription) => {
  return (
    <>
      <div>
        {currencyFormatter({
          currency: 'COP',
          value: unitPrice,
        })}
      </div>
      <div>unidades: {stock}</div>
    </>
  );
};

export default ProductDescription;
