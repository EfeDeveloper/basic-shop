import { Product } from '../interfaces/productsInterfaces';

const API_URL = import.meta.env.VITE_API_URL ?? 'https://fakestoreapi.com/products';
const DEFAULT_STOCK = 10;

interface FakeStoreProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: { rate: number; count: number };
}

function mapFakeStoreToProduct(item: FakeStoreProduct): Product {
  const stock = item.rating?.count ?? DEFAULT_STOCK;
  return {
    id: item.id,
    name: item.title,
    description: item.description,
    unit_price: item.price,
    stock,
    type: item.category,
    urlImage: item.image,
    initialQuantity: 1,
    rating: item.rating,
  };
}

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch products');
  const data: FakeStoreProduct[] = await res.json();
  return data.map(mapFakeStoreToProduct);
}
