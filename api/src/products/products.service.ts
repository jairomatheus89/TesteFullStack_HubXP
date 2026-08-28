import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

//Schemas
import { Product } from "./schema/products.schema";
import { Category } from "../category/schema/category.schema";

//DTOs
import { ProductRegister } from "./dto/product-register.dto";
import { ProductId } from "./dto/product-by-id.dto";
import { ProductPatcher } from "./dto/product-patch.dto";

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>
  ){}

  async postProduct(data: ProductRegister) {
    const categories = await this.categoryModel.find({
      _id: {$in: data.categoryIds},
    });

    if(categories.length !== data.categoryIds.length){
      throw new NotFoundException("Uma ou mais categorias não existem...");
    }

    const product = new this.productModel(data);
    return product.save();
  }

  async getProduct(data: ProductId){
    const category = await this.productModel.findById(data.id);
    return category;
  }

  async patchProduct(data: ProductPatcher){
    const categories = await this.categoryModel.find({
      _id: {$in: data.categoryIds},
    });

    if(categories.length !== data.categoryIds.length){
      throw new NotFoundException("Uma ou mais categorias não existem...");
    }

    const product = await this.productModel.findByIdAndUpdate(
      data.id,
      {
        name: data.name,
        description: data.description,
        price: data.price,
        categoryIds: data.categoryIds,
        imageUrl: data.imageUrl
      },
      {returnDocument: 'after'}
    );

    if(product == null){
      throw new NotFoundException("Product já não existe mais...");
    }

    return {
      status: "Produto atualizado!",
      product: product
    };
  }

  async removeProduct(data: ProductId){
    const product = await this.productModel.findByIdAndDelete(data.id, {returnDocument: 'after'});

    if(product == null){
      throw new NotFoundException("Produto não existente");
    }

    return {
      status: "Produto Deletado!",
      produto: product
    }
  }
}