import { Body, Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { CategoryService } from "./category.service";

//DTOs
import { CategoryRegister } from "./dto/CategoryRegister.dto";
import { CategoryId } from "./dto/category-by-id.dto";
import { CategoryPatch } from "./dto/category-update.dto";

@Controller('category')
export class CategoryController{

  constructor (
    private readonly categoryService: CategoryService
  ){}
  
  @Post()
  registerCategory(@Body() body: CategoryRegister) {
    return this.categoryService.registerCategory(body);
  }

  @Get()
  getCategory(@Body() body: CategoryId){
    return this.categoryService.getCategory(body);
  }

  @Patch()
  patchCategory(@Body() body: CategoryPatch){
    return this.categoryService.patchCategory(body);
  }

  @Delete()
  deleteCategory(@Body() body: CategoryId){
    return this.categoryService.removeCategory(body);
  }
}