import { BadRequestException, Body, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

//Schema
import { Order } from "./schema/order.schema";
import { Product } from "../products/schema/products.schema";

//DTOs
import { OrderCreateDto } from "./dto/create-order.dto";
import { OrderIdDto } from "./dto/get-order.dto";
import { OrderPatchDto } from "./dto/patch-order.dto";

//interface
import { OrderCreatedEvent } from "./interfaces/orderCreated-lambda";


@Injectable()
export class OrderService {

  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<Order>,
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>
  ){}

  async createOrder(@Body() dto: OrderCreateDto){

    const products = await this.productModel.find({
      _id: {$in: dto.products},
    });

    if(products.length !== new Set(dto.products).size){
      throw new NotFoundException("Um ou mais produtos nao estão disponiveis ou não existem...");
    }

    if(products.length < 1) throw new BadRequestException("A compra deve conter pelo menos UM produto...");

    const total = dto.products.reduce((sum, productId) => {
      const product = products.find(
        product => product._id.toString() === productId
      );
      if(!product){
        throw new NotFoundException("Um ou mais produtos nao estao disponiveis ou nao existem...");
      }
      return sum + product.price;
    }, 0)

    const order = new this.orderModel(
      {
        products: products,
        total: total
      }
    );

    const savedOrder = await order.save();

    const createdOrderEvent: OrderCreatedEvent = {
      type: "ORDER_CREATED",
      orderId: savedOrder._id.toString(),
      total: savedOrder.total
    }

    await fetch("http://localhost:3001/order-created", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(createdOrderEvent)
    });

    console.log("EVENTO PARA LAMBDA:");
    console.log(createdOrderEvent);

    return savedOrder;
  }

  async getOrder(@Body() dto: OrderIdDto){

    const order = await this.orderModel.findById(dto.orderId);

    if(!order){
      throw new NotFoundException("Ordem ja nao existe mais...");
    }

    return order;

  }

  async putOrder(@Body() dto: OrderPatchDto){

    const products = await this.productModel.find({
      _id: {$in: dto.products},
    });

    if(products.length !== new Set(dto.products).size){
      throw new NotFoundException("Um ou mais produtos nao estão disponiveis ou não existem...");
    }

    if(products.length < 1) throw new BadRequestException("A compra deve conter pelo menos UM produto...");

    const total = dto.products.reduce((sum, productId) => {
      const product = products.find(
        product => product._id.toString() === productId
      );
      if(!product){
        throw new NotFoundException("Um ou mais produtos nao estao disponiveis ou nao existem...");
      }
      return sum + product.price;
    }, 0)

    const order = await this.orderModel.findByIdAndUpdate(
      dto.id,
      {
        products: dto.products,
        total: total
      },
      {returnDocument: 'after'}
    )

    if(!order){
      throw new NotFoundException("Order não existe mais...");
    }

    return {
      status: "Compra atualizada",
      order: order
    }
  }

  async removeOrder(@Body() dto: OrderIdDto){
    const order = await this.orderModel.findByIdAndDelete(
      dto.orderId,
      {returnDocument: 'after'}
    );

    if(!order){
      throw new NotFoundException("Essa order ja não existe mais...");
    }

    return {
      status: "Order Removida!",
      order: order
    }
  }
}