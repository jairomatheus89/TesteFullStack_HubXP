import { ProductsService } from "./products.service";
import { ProductRegister } from "./dto/ProductRegister.dto";
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    ProductRegister(body: ProductRegister): Promise<import("mongoose").Document<unknown, {}, import("./schema/products.schema").Product, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/products.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}
