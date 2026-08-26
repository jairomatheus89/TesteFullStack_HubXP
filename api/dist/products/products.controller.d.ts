import { ProductsService } from "./products.service";
import { ProductRegister } from "./dto/ProductRegister.dto";
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    helloFromProducts(): string;
    ProductRegister(body: ProductRegister): string;
}
