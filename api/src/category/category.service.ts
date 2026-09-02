import { BadRequestException, ConflictException, Injectable, NotFoundException  } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, trusted, Types } from "mongoose";

//Schema
import { Category } from "./schema/category.schema";
import { Product } from "../products/schema/products.schema";

//DTOs
import { CategoryRegister } from "./dto/CategoryRegister.dto";
import { CategoryId } from "./dto/category-by-id.dto";
import { CategoryPatch } from "./dto/category-update.dto";

@Injectable()
export class CategoryService {

  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>
  ){}

  async registerCategory(data: CategoryRegister) {

    const categoryExisted = await this.categoryModel.findOne(
      data
    )

    if(categoryExisted != null){
      return {
        status: "Categoria ja existente!"
      }
    }

    const category = new this.categoryModel(data);
    return category.save();
  }

  async getCategory(data: CategoryId){
    const category = await this.categoryModel.findById(data.id);
    return category;
  }

  async patchCategory(data: CategoryPatch){
    const category = await this.categoryModel.findByIdAndUpdate(
      data.id,
      {
        name: data.name
      },
      { returnDocument: 'after'}
    );

    if(category == null){
      throw new NotFoundException("Categoria ja nao existe mais...");
    }
    return category;
  }

  async removeCategory(data: CategoryId){

    if(!Types.ObjectId.isValid(data.id)){
      throw new BadRequestException("Id de categoria invalido!");
    }

    const categoryId = new Types.ObjectId(data.id);

    const productDependsExclusiveOnCategory = await this.productModel.exists({
      categoryIds:[categoryId],
    });

    if(productDependsExclusiveOnCategory){
      throw new ConflictException("Não é possivel deletar essa categoria pois existem produtos que dependem exclusivamente dela.");
    }

    await this.productModel.updateMany(
      {categoryIds: categoryId},
      {$pull: {categoryIds: categoryId}}
    );


    const category = await this.categoryModel.findByIdAndDelete(categoryId, {returnDocument: 'after'});
    if(category == null){
      return {
        status: "Categoria não encontrada ou inexistente!",
      };
    }
    return {
      status: "Categoria deletada!",
      categoria: category
    };
  }
}