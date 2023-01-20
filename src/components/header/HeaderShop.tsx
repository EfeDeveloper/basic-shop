import { ShoppingOutlined } from '@ant-design/icons';
import { Badge, Button, Layout, Typography } from 'antd';
import { useContext } from 'react';
import { ProductsContext } from '../../context/ProductsContext';

const { Title } = Typography;

const { Header } = Layout;
const HeaderShop = () => {
  const { countProducts, onOpenShoppingCart } = useContext(ProductsContext);

  return (
    <Header
      className="site-layout-sub-header-background"
      style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}
    >
      <div style={{ textAlign: 'start', width: '80%', display: 'inline-block' }}>
        <Title style={{ marginTop: 20, color: '#f7f7f7' }} level={3}>
          EdFer-Dev Shop
        </Title>
      </div>
      <div style={{ textAlign: 'end', width: '20%', display: 'inline-block' }}>
        <Badge count={countProducts}>
          <Button
            style={{ background: 'transparent', borderColor: 'transparent' }}
            icon={<ShoppingOutlined style={{ fontSize: '25px', color: '#f7f7f7' }} />}
            onClick={() => onOpenShoppingCart()}
          ></Button>
        </Badge>
      </div>
    </Header>
  );
};

export default HeaderShop;
