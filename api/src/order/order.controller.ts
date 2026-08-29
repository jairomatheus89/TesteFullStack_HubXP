import { Body, Controller, Delete, Get, Patch, Post, Put } from "@nestjs/common";
import { OrderService } from "./order.service";

//DTOs
import { OrderCreateDto } from "./dto/create-order.dto";
import { OrderIdDto } from "./dto/get-order.dto";
import { OrderPatchDto } from "./dto/patch-order.dto";


@Controller('order')
export class OrderController{

  constructor (
    private readonly orderService: OrderService
  ){}

  @Post()
  createOrder(@Body() dto: OrderCreateDto){
    return this.orderService.createOrder(dto);
  }

  @Get()
  getOrder(@Body() dto: OrderIdDto){
    return this.orderService.getOrder(dto);
  }

  @Put()
  putOrder(@Body() dto: OrderPatchDto){
    return this.orderService.putOrder(dto);
  }

  @Delete()
  removeOrder(@Body() dto: OrderIdDto){
    return this.orderService.removeOrder(dto);
  }

}