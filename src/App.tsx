import 'antd/dist/antd.css';
import { ProductsProvider } from './context/ProductsContext';
import './index.css';
import HomeScreen from './screens/HomeScreen';

const AppContext = ({ children }: any) => {
  return <ProductsProvider>{children}</ProductsProvider>;
};

function App() {
  return (
    <AppContext>
      <HomeScreen />
    </AppContext>
  );
}

export default App;
