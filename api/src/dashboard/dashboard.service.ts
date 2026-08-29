import { BadRequestException, Body, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

//Models
import { Order } from "../order/schema/order.schema";

@Injectable()
export class DashboardService {

  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<Order>
  ){}

  async valorTotalOrders(){
    const [result] = await this.orderModel.aggregate([{
      $group:{
        _id: null,
        valorTotal: {$sum: "$total"}
      },
    }]);
    return {
      valorTotal: result?.valorTotal ?? 0
    };
  }

  async valorMedioOrders(){
    const [result] = await this.orderModel.aggregate([{
      $group:{
        _id: null,
        valorMedio: {$avg: "$total"}
      },
    }]);
    return {
      valorMedio: result?.valorMedio ?? 0
    }
  }

  async totalOrders(){

    const [result] = await this.orderModel.aggregate([{
      $group:{
        _id: null,
        totalPedidos: {$sum: 1}
      }
    }]);

    return {
      totalPedidos: result?.totalPedidos ?? 0
    };
  }
}