import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductRegister } from "./dto/ProductRegister.dto";

@Controller('products')
export class ProductsController{

  constructor (
    private readonly productsService: ProductsService
  ){}

  @Get()
  helloFromProducts(): string {
    return "HELLO FROM PRODUCTS BUDDY!"
  }

  @Post()
  ProductRegister(@Body() body: ProductRegister) {
    return this.productsService.minorAge();
  }
}