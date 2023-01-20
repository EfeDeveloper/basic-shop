import { Product } from './productsInterfaces';

export interface IGProductContextInterface {
  productsDatabase: Product[];
  allProducts: Product[];
  totalValue: number;
  countProducts: number;
  openShoppingCart: boolean;
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (product: Product) => void;
  onEmptyCart: () => void;
  onOpenShoppingCart: () => void;
  createJSONToExport: () => void;
  filterByType: (checked: boolean, type: string) => void;
  dynamicSearch: ( searchData: string) => void;
}
