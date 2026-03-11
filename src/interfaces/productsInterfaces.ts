export interface IPoducts {
  products: Product[];
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  unit_price: number;
  stock: number;
  type: string;
  urlImage?: string;
  initialQuantity: number;
}

export interface IProductDescription {
  unitPrice: number;
  stock: number;
}
