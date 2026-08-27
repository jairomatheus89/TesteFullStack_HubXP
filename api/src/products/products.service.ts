import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Product } from "./schema/products.schema";
import { ProductRegister } from "./dto/ProductRegister.dto";

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ){}

  async registerProduct(data: ProductRegister) {
    const product = new this.productModel(data);

    return product.save();
  }
}