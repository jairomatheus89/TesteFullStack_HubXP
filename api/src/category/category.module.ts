import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Category, CategorySchema } from "./schema/category.schema";
import { Product, ProductSchema } from "../products/schema/products.schema";

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema
      },
      {
        name: Product.name,
        schema: ProductSchema
      }
    ])
  ],
  controllers: [
    CategoryController
  ],
  providers: [
    CategoryService
  ]
})

export class CategoryModule {}