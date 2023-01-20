import { Layout, Typography } from 'antd';
import CartDawer from '../components/drawer/CartDawer';
import HeaderShop from '../components/header/HeaderShop';
import ProductsList from '../components/products/ProductsList';
import Search from '../components/search/Search';

const { Content, Footer } = Layout;

const { Title } = Typography;

const HomeScreen = () => {
  const currentYear = new Date();

  return (
    <Layout>
      <Layout>
        <HeaderShop />
        <Content>
          <div className="home-screen-content-shild">
            <Search/>
            <ProductsList />
            <CartDawer />
          </div>
        </Content>
        <Footer className="footer">
          <Title level={5} style={{ color: '#f7f7f7' }}>
            EdFer-Dev Shop ©{currentYear.getFullYear()} Created by EdFer
          </Title>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default HomeScreen;
