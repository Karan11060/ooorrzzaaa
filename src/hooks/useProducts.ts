import { products as localProducts, type Product } from '@/data/products';

export const useProducts = () => {
  return { products: localProducts, loading: false };
};

export type { Product };
