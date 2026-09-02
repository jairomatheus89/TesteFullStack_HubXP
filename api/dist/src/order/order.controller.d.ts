import { OrderService } from "./order.service";
import { OrderCreateDto } from "./dto/create-order.dto";
import { OrderIdDto } from "./dto/get-order.dto";
import { OrderPatchDto } from "./dto/patch-order.dto";
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    createOrder(dto: OrderCreateDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/order.schema").Order, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/order.schema").Order & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    getOrder(dto: OrderIdDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/order.schema").Order, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/order.schema").Order & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    putOrder(dto: OrderPatchDto): Promise<{
        status: string;
        order: import("mongoose").Document<unknown, {}, import("./schema/order.schema").Order, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/order.schema").Order & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        };
    }>;
    removeOrder(dto: OrderIdDto): Promise<{
        status: string;
        order: import("mongoose").Document<unknown, {}, import("./schema/order.schema").Order, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/order.schema").Order & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        };
    }>;
}
