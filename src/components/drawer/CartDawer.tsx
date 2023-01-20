import { CheckOutlined, CloseOutlined, DeleteOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Avatar, Button, Divider, Drawer, List, Result, Space, Typography } from 'antd';
import { useContext } from 'react';
import { ProductsContext } from '../../context/ProductsContext';
import { currencyFormatter } from '../../utils';

const { Title } = Typography;

const CartDawer = () => {
  const {
    allProducts,
    totalValue,
    onDeleteProduct,
    createJSONToExport,
    onEmptyCart,
    openShoppingCart,
    onOpenShoppingCart,
  } = useContext(ProductsContext);

  return (
    <Drawer
      title="Carrito de compras"
      placement="right"
      onClose={onOpenShoppingCart}
      open={openShoppingCart}
    >
      {allProducts.length > 0 ? (
        <>
          <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={allProducts}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    key={item.id}
                    type="primary"
                    danger
                    size="small"
                    icon={<CloseOutlined />}
                    onClick={() => onDeleteProduct(item)}
                  />,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.urlImage} />}
                  title={<Title level={5}>{item.name}</Title>}
                  description={
                    <>
                      {currencyFormatter({
                        currency: 'COP',
                        value: item.unit_price,
                      })}
                      <div>X {item.initialQuantity}</div>
                    </>
                  }
                />
              </List.Item>
            )}
          />
          <Divider />
          <Title style={{ marginTop: 20 }} level={4}>
            Total:{' '}
            {currencyFormatter({
              currency: 'COP',
              value: totalValue,
            })}
          </Title>
          <Button
            block
            type="primary"
            size="middle"
            icon={<CheckOutlined/>}
            onClick={()=>createJSONToExport()}
          >
            Crear orden
          </Button>
          <Divider />
          <Button
            block
            type="primary"
            danger
            size="middle"
            icon={<DeleteOutlined />}
            onClick={onEmptyCart}
          >
            Vaciar carrito
          </Button>
        </>
      ) : (
        <Result
          title="¡Heyyy vamos!"
          subTitle="Inicia tu compra agregando productos al carrito"
          icon={<ShoppingOutlined />}
        />
      )}
    </Drawer>
  );
};

export default CartDawer;
