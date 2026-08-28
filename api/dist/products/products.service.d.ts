import { Model } from "mongoose";
import { Product } from "./schema/products.schema";
import { Category } from "../category/schema/category.schema";
import { ProductRegister } from "./dto/product-register.dto";
import { ProductId } from "./dto/product-by-id.dto";
import { ProductPatcher } from "./dto/product-patch.dto";
export declare class ProductsService {
    private readonly productModel;
    private readonly categoryModel;
    constructor(productModel: Model<Product>, categoryModel: Model<Category>);
    postProduct(data: ProductRegister): Promise<import("mongoose").Document<unknown, {}, Product, {}, import("mongoose").DefaultSchemaOptions> & Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    getProduct(data: ProductId): Promise<(import("mongoose").Document<unknown, {}, Product, {}, import("mongoose").DefaultSchemaOptions> & Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    patchProduct(data: ProductPatcher): Promise<{
        status: string;
        product: import("mongoose").Document<unknown, {}, Product, {}, import("mongoose").DefaultSchemaOptions> & Product & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        };
    }>;
    removeProduct(data: ProductId): Promise<{
        status: string;
        produto: import("mongoose").Document<unknown, {}, Product, {}, import("mongoose").DefaultSchemaOptions> & Product & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        };
    }>;
}
