import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "./schema/products.schema";
import { Category, CategorySchema } from "../category/schema/category.schema";

@Module({
  imports:[
    MongooseModule.forFeature([
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
    ProductsController
  ],
  providers: [
    ProductsService
  ]
})

export class ProductsModule {}