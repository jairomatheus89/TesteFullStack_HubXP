import { Model } from "mongoose";
import { Product } from "./schema/products.schema";
import { ProductRegister } from "./dto/ProductRegister.dto";
export declare class ProductsService {
    private readonly productModel;
    constructor(productModel: Model<Product>);
    registerProduct(data: ProductRegister): Promise<import("mongoose").Document<unknown, {}, Product, {}, import("mongoose").DefaultSchemaOptions> & Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}
