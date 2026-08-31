import { Model } from "mongoose";
import { Order } from "./schema/order.schema";
import { Product } from "../products/schema/products.schema";
import { OrderCreateDto } from "./dto/create-order.dto";
import { OrderIdDto } from "./dto/get-order.dto";
import { OrderPatchDto } from "./dto/patch-order.dto";
export declare class OrderService {
    private readonly orderModel;
    private readonly productModel;
    constructor(orderModel: Model<Order>, productModel: Model<Product>);
    createOrder(dto: OrderCreateDto): Promise<import("mongoose").Document<unknown, {}, Order, {}, import("mongoose").DefaultSchemaOptions> & Order & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    getOrder(dto: OrderIdDto): Promise<import("mongoose").Document<unknown, {}, Order, {}, import("mongoose").DefaultSchemaOptions> & Order & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    putOrder(dto: OrderPatchDto): Promise<{
        status: string;
        order: import("mongoose").Document<unknown, {}, Order, {}, import("mongoose").DefaultSchemaOptions> & Order & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        };
    }>;
    removeOrder(dto: OrderIdDto): Promise<{
        status: string;
        order: import("mongoose").Document<unknown, {}, Order, {}, import("mongoose").DefaultSchemaOptions> & Order & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        };
    }>;
}
