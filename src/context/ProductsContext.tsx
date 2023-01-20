import { createContext, useState } from 'react';
import { dataProducts } from '../data/products';
import { IGProductContextInterface as IProductContextInterface } from '../interfaces/productContextInterface';
import { Product } from '../interfaces/productsInterfaces';
import { exportDataToJSON, fechaYHoraActual } from '../utils';

export const ProductsContext = createContext({} as IProductContextInterface);

export const ProductsProvider = ({ children }: any) => {
  const [productsDatabase, setProductsDatabase] = useState<Product[]>(dataProducts);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [totalValue, setValorTotal] = useState<number>(0);
  const [countProducts, setCountProducs] = useState<number>(0);
  const [openShoppingCart, setOpenShoppingCart] = useState<boolean>(false);

  const deleteStockFromDatabase = (product: Product) => {
    const newProductsToDatabase = productsDatabase.map((item) =>
      item.id === product.id ? { ...item, stock: item.stock - 1 } : item
    );
    setProductsDatabase([...newProductsToDatabase]);
  };

  const addStockToDatabase = (product: Product) => {
    const newProductsToDatabase = productsDatabase.map((item) =>
      item.id === product.id
        ? { ...item, stock: item.stock + product.initialQuantity }
        : item
    );
    setProductsDatabase([...newProductsToDatabase]);
  };

  const onAddProduct = (product: Product) => {
    deleteStockFromDatabase(product);
    setCountProducs(countProducts + product.initialQuantity);
    setValorTotal(totalValue + product.unit_price * product.initialQuantity);

    const productExist = allProducts.find((item) => item.id === product.id);

    if (productExist) {
      const newProducts = allProducts.map((item) =>
        item.id === product.id
          ? { ...item, initialQuantity: item.initialQuantity + 1 }
          : item
      );
      setAllProducts([...newProducts]);
      return;
    }

    setAllProducts([...allProducts, product]);
  };

  const onDeleteProduct = (product: Product) => {
    addStockToDatabase(product);
    setCountProducs(countProducts - product.initialQuantity);
    setValorTotal(totalValue - product.unit_price * product.initialQuantity);

    const newProducts = allProducts.filter((item) => item.id !== product.id);

    setAllProducts([...newProducts]);
  };

  const onEmptyCart = () => {
    setAllProducts([]);
    setValorTotal(0);
    setCountProducs(0);
    setProductsDatabase(dataProducts);
  };

  const onOpenShoppingCart = () => {
    setOpenShoppingCart(!openShoppingCart);
  };

  const createJSONToExport = () => {
    const productOrder = allProducts.map((item) => {
      return {
        'nombre del producto': item.name,
        type: item.type,
        cantidad: item.initialQuantity,
        'valor unitario': item.unit_price,
        'valor total': item.unit_price * item.initialQuantity,
      };
    });

    const orderToDownload = {
      ...productOrder,
      'hora y fecha': fechaYHoraActual(),
      'total productos': countProducts,
      'total a pagar': totalValue,
    };

    exportDataToJSON(orderToDownload);
  };

  const filterByType = (checked: boolean, type: string) => {
    if (checked) {
      const newProducts = productsDatabase.filter((item) => item.type === type);
      setProductsDatabase([...newProducts]);
    } else {
      setProductsDatabase([...dataProducts]);
    }
  };

  const dynamicSearch = (searchData: string) => {
    const newProducts = dataProducts.filter((item) =>
      item.name.toLowerCase().includes(searchData.toLowerCase())
    );
    setProductsDatabase([...newProducts]);
  };

  return (
    <ProductsContext.Provider
      value={{
        productsDatabase,
        allProducts,
        totalValue,
        countProducts,
        openShoppingCart,
        onAddProduct,
        onDeleteProduct,
        onEmptyCart,
        onOpenShoppingCart,
        createJSONToExport,
        filterByType,
        dynamicSearch,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
