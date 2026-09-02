export interface HttpEvent {
  body: string;
}

export interface OrderCreatedEvent {
  type: "ORDER_CREATED";
  orderId: string;
  total: number;
}