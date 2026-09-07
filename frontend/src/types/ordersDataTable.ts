export interface OrderProduct {
  _id: string;
  name: string;
}

export interface Order {
  _id: string;
  date: string;
  products: OrderProduct[];
  total: number;
}

export type OrderDataTable = Order[];