import { Model } from "mongoose";
import { Order } from "../order/schema/order.schema";
export declare class DashboardService {
    private readonly orderModel;
    constructor(orderModel: Model<Order>);
    valorTotalOrders(): Promise<{
        valorTotal: any;
    }>;
    valorMedioOrders(): Promise<{
        valorMedio: any;
    }>;
    totalOrders(): Promise<{
        totalPedidos: any;
    }>;
}
