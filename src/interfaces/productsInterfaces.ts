export interface Product {
  id: number;
  name: string;
  description?: string;
  unit_price: number;
  stock: number;
  type: string;
  urlImage?: string;
  initialQuantity: number;
  rating?: { rate: number; count: number };
}

export interface IProductDescription {
  unitPrice: number;
  stock: number;
}
