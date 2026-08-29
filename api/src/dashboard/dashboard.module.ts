import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DashboardController } from "./dashboard.controller";
import { DashboardService } from "./dashboard.service";
import { Category, CategorySchema } from "../category/schema/category.schema";
import { Product, ProductSchema } from "../products/schema/products.schema";
import { Order, OrderSchema } from "../order/schema/order.schema";

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
      {
        name: Category.name,
        schema: CategorySchema
      }
    ])
  ],
  controllers: [
    DashboardController
  ],
  providers: [
    DashboardService
  ]
})

export class DashboardModule {}