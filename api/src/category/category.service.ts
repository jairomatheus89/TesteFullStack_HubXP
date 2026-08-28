import { Injectable, NotFoundException  } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, trusted } from "mongoose";

//Schema
import { Category } from "./schema/category.schema";

//DTOs
import { CategoryRegister } from "./dto/CategoryRegister.dto";
import { CategoryId } from "./dto/category-by-id.dto";
import { CategoryPatch } from "./dto/category-update.dto";

@Injectable()
export class CategoryService {

  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
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
    const category = await this.categoryModel.findByIdAndDelete(data.id, {returnDocument: 'after'});
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