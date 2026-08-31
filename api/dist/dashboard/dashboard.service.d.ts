import { Model } from "mongoose";
import { Order } from "../order/schema/order.schema";
import { DashboardFilterDto } from "./dto/dashboard-filter.dto";
export declare class DashboardService {
    private readonly orderModel;
    constructor(orderModel: Model<Order>);
    ordersAggregation(filter: DashboardFilterDto): Promise<{
        valorTotal: any;
        valorMedio: number;
        totalPedidos: any;
    }>;
}
