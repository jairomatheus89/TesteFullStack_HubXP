"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const faker_1 = require("@faker-js/faker");
const category_schema_1 = require("../src/category/schema/category.schema");
const products_schema_1 = require("../src/products/schema/products.schema");
const order_schema_1 = require("../src/order/schema/order.schema");
const categoryModel = mongoose_1.default.model(category_schema_1.Category.name, category_schema_1.CategorySchema);
const productModel = mongoose_1.default.model(products_schema_1.Product.name, products_schema_1.ProductSchema);
const orderModel = mongoose_1.default.model(order_schema_1.Order.name, order_schema_1.OrderSchema);
const MONGO_URI = process.env.MONGODB_URI ?? "mongodb://localhost:27017/test_hub_x";
async function seed() {
    try {
        await mongoose_1.default.connect(MONGO_URI);
        console.log("Connected to mongodb");
        await orderModel.deleteMany({});
        await productModel.deleteMany({});
        await categoryModel.deleteMany({});
        const categories = Array.from({ length: 20 }, () => ({
            name: faker_1.faker.commerce.department()
        }));
        const categoriesCreated = await categoryModel.insertMany(categories);
        const products = Array.from({ length: 60 }, () => ({
            name: faker_1.faker.commerce.productName(),
            description: faker_1.faker.commerce.productDescription(),
            price: faker_1.faker.number.float({
                min: 10,
                max: 8000,
                fractionDigits: 2
            }),
            categoryIds: faker_1.faker.helpers.arrayElements(categoriesCreated.map(category => category._id), { min: 1, max: 3 }),
        }));
        const productsCreated = await productModel.insertMany(products);
        const orders = Array.from({ length: 10 }, () => {
            const selectedProducts = faker_1.faker.helpers.arrayElements(productsCreated, { min: 1, max: 6 });
            const total = selectedProducts.reduce((sum, product) => sum + product.price, 0);
            return {
                date: faker_1.faker.date.past(),
                products: selectedProducts.map(product => product._id),
                total,
            };
        });
        const orderCreated = await orderModel.insertMany(orders);
        console.log("Categorias criadas: ", categoriesCreated.length);
        console.log("Produtos criados: ", productsCreated.length);
        console.log("Orders criados: ", orderCreated.length);
    }
    catch (error) {
        console.error("seed error: ", error);
        process.exit(1);
    }
    finally {
        await mongoose_1.default.disconnect();
    }
}
seed();
//# sourceMappingURL=seed.js.map