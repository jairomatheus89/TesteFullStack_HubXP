import { Model } from "mongoose";
import { Category } from "./schema/category.schema";
import { CategoryRegister } from "./dto/CategoryRegister.dto";
import { CategoryId } from "./dto/category-by-id.dto";
import { CategoryPatch } from "./dto/category-update.dto";
export declare class CategoryService {
    private readonly categoryModel;
    constructor(categoryModel: Model<Category>);
    registerCategory(data: CategoryRegister): Promise<(import("mongoose").Document<unknown, {}, Category, {}, import("mongoose").DefaultSchemaOptions> & Category & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | {
        status: string;
    }>;
    getCategory(data: CategoryId): Promise<(import("mongoose").Document<unknown, {}, Category, {}, import("mongoose").DefaultSchemaOptions> & Category & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    patchCategory(data: CategoryPatch): Promise<import("mongoose").Document<unknown, {}, Category, {}, import("mongoose").DefaultSchemaOptions> & Category & {
        _id: import("mongoose").Types.ObjectId;
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
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        };
    }>;
}
