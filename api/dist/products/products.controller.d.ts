import { ProductsService } from "./products.service";
import { ProductRegister } from "./dto/product-register.dto";
import { ProductId } from "./dto/product-by-id.dto";
import { ProductPatcher } from "./dto/product-patch.dto";
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    postProduct(body: ProductRegister): Promise<import("mongoose").Document<unknown, {}, import("./schema/products.schema").Product, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/products.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    getProduct(body: ProductId): Promise<(import("mongoose").Document<unknown, {}, import("./schema/products.schema").Product, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/products.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    patchProduct(body: ProductPatcher): Promise<{
        status: string;
        product: import("mongoose").Document<unknown, {}, import("./schema/products.schema").Product, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/products.schema").Product & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        };
    }>;
    removeProduct(body: ProductId): Promise<{
        status: string;
        produto: import("mongoose").Document<unknown, {}, import("./schema/products.schema").Product, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/products.schema").Product & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        };
    }>;
}
