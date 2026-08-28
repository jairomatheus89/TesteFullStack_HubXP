import { Body, Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ProductsService } from "./products.service";

//DTOs
import { ProductRegister } from "./dto/product-register.dto";
import { ProductId } from "./dto/product-by-id.dto";
import { ProductPatcher } from "./dto/product-patch.dto";

@Controller('products')
export class ProductsController{

  constructor (
    private readonly productsService: ProductsService
  ){}

  @Post()
  postProduct(@Body() body: ProductRegister) {
    return this.productsService.postProduct(body);
  }

  @Get()
  getProduct(@Body() body: ProductId){
    return this.productsService.getProduct(body);
  }

  @Patch()
  patchProduct(@Body() body: ProductPatcher){
    return this.productsService.patchProduct(body);
  }

  @Delete()
  removeProduct(@Body() body: ProductId){
    return this.productsService.removeProduct(body);
  }
}