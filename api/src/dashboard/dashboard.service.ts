import { BadRequestException, Body, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

//Models
import { Order } from "../order/schema/order.schema";

//DTOs
import { DashboardFilterDto } from "./dto/dashboard-filter.dto";
import { pipe } from "rxjs";

@Injectable()
export class DashboardService {

  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<Order>
  ){}

  async ordersAggregation(filter: DashboardFilterDto){

    const match: any = {};

    const pipeline: any = [];

    if(filter.startDate || filter.endDate){

      match.date = {};

      if(filter.startDate){
        match.date.$gte = new Date(filter.startDate);
      }

      if(filter.endDate){
        match.date.$lte = new Date(filter.endDate);
      }
    }

    if(filter.productId){
      match.products = new Types.ObjectId(filter.productId);
    }

    if(filter.categoryId){
      pipeline.push({
        $lookup: {
          from: "products",
          let: {
            productIds: "$products"
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in:[
                    "$_id", {$ifNull: ["$$productIds", []]}
                  ]
                },
                categoryIds: new Types.ObjectId(filter.categoryId)
              }
            }
          ],
          as: "productData"
        }
      });

      pipeline.push({
        $match: {
          "productData.0": {$exists: true}
        }
      });
    }

    const [result] = await this.orderModel.aggregate([
      {
        $match: match
      },
      ...pipeline,
      {
        $group:{
          _id: null,
          valorTotal: {$sum: "$total"},
          valorMedio: {$avg: "$total"},
          totalPedidos: {$sum: 1}
        },
      },
      
    ]);
    return {
      valorTotal: result?.valorTotal ?? 0,
      valorMedio: result?.valorMedio ? Number(result.valorMedio.toFixed(2)) : 0,
      totalPedidos: result?.totalPedidos ?? 0
    };

  }
}