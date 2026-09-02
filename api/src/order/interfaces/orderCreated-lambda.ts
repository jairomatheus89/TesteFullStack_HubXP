export interface OrderCreatedEvent {
  type: "ORDER_CREATED";
  orderId: string;
  total: number;
}