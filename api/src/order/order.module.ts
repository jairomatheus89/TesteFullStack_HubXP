import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { Order, OrderSchema } from "./schema/order.schema";
import { Product, ProductSchema } from "../products/schema/products.schema";


@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema
      },
      {
        name: Product.name,
        schema: ProductSchema
      },
    ])
  ],
  controllers: [
    OrderController
  ],
  providers: [
    OrderService
  ]
})

export class OrderModule {}