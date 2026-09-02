import { Model, Types } from "mongoose";
import { Category } from "./schema/category.schema";
import { Product } from "../products/schema/products.schema";
import { CategoryRegister } from "./dto/CategoryRegister.dto";
import { CategoryId } from "./dto/category-by-id.dto";
import { CategoryPatch } from "./dto/category-update.dto";
export declare class CategoryService {
    private readonly categoryModel;
    private readonly productModel;
    constructor(categoryModel: Model<Category>, productModel: Model<Product>);
    registerCategory(data: CategoryRegister): Promise<(import("mongoose").Document<unknown, {}, Category, {}, import("mongoose").DefaultSchemaOptions> & Category & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | {
        status: string;
    }>;
    getCategory(data: CategoryId): Promise<(import("mongoose").Document<unknown, {}, Category, {}, import("mongoose").DefaultSchemaOptions> & Category & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    patchCategory(data: CategoryPatch): Promise<import("mongoose").Document<unknown, {}, Category, {}, import("mongoose").DefaultSchemaOptions> & Category & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    removeCategory(data: CategoryId): Promise<{
        status: string;
        categoria?: undefined;
    } | {
        status: string;
        categoria: import("mongoose").Document<unknown, {}, Category, {}, import("mongoose").DefaultSchemaOptions> & Category & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        };
    }>;
}
