import { OrderCreatedEvent, HttpEvent } from "../events/orderCreatedEvent";

export const handler = async (event: HttpEvent)  => {

  const orderCreatedEvent: OrderCreatedEvent = JSON.parse(event.body);

  console.log(
    `Processando evento ${orderCreatedEvent.type} para Order ${orderCreatedEvent.orderId}`
  );

  console.log(`Total da Order: R$ ${orderCreatedEvent.total}`);

  return {
    statusCode: 200,
    body: JSON.stringify({
      processed: true,
      orderId: orderCreatedEvent.orderId
    })
  };
}