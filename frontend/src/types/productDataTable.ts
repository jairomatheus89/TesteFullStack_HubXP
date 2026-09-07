export interface ProductCategory {
  _id: string;
  name: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  categoryIds: ProductCategory[];
}

export type ProductDataTable = Product[];