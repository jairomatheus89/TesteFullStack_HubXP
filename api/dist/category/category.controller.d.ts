import { CategoryService } from "./category.service";
import { CategoryRegister } from "./dto/CategoryRegister.dto";
import { CategoryId } from "./dto/category-by-id.dto";
import { CategoryPatch } from "./dto/category-update.dto";
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    registerCategory(body: CategoryRegister): Promise<(import("mongoose").Document<unknown, {}, import("./schema/category.schema").Category, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/category.schema").Category & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | {
        status: string;
    }>;
    getCategory(body: CategoryId): Promise<(import("mongoose").Document<unknown, {}, import("./schema/category.schema").Category, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/category.schema").Category & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    patchCategory(body: CategoryPatch): Promise<import("mongoose").Document<unknown, {}, import("./schema/category.schema").Category, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/category.schema").Category & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    deleteCategory(body: CategoryId): Promise<{
        status: string;
        categoria?: undefined;
    } | {
        status: string;
        categoria: import("mongoose").Document<unknown, {}, import("./schema/category.schema").Category, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/category.schema").Category & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        };
    }>;
}
