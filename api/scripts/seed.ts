import mongoose from "mongoose";
import { faker } from "@faker-js/faker";

import { Category, CategorySchema } from "../src/category/schema/category.schema";
import { Product, ProductSchema } from "../src/products/schema/products.schema";
import { Order, OrderSchema } from "../src/order/schema/order.schema";

const categoryModel = mongoose.model(Category.name, CategorySchema);
const productModel = mongoose.model(Product.name, ProductSchema);
const orderModel = mongoose.model(Order.name, OrderSchema);

const MONGO_URI = process.env.MONGODB_URI ?? "mongodb://localhost:27017/test_hub_x";

async function seed(){

  try{
    await mongoose.connect(MONGO_URI);
    console.log("Connected to mongodb");

    await orderModel.deleteMany({});
    await productModel.deleteMany({});
    await categoryModel.deleteMany({});

    const categories = Array.from({length: 20}, () => ({
      name: faker.commerce.department()
    }));
    const categoriesCreated = await categoryModel.insertMany(categories);

    const products = Array.from({length: 60}, () => ({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.number.float({
        min: 10,
        max: 8000,
        fractionDigits: 2
      }),
      categoryIds: faker.helpers.arrayElements(
        categoriesCreated.map(category => category._id),
        {min: 1, max: 3}
      ),
    }));
    const productsCreated = await productModel.insertMany(products);

    const orders = Array.from({length: 10}, () => {

      const selectedProducts = faker.helpers.arrayElements(
        productsCreated,
        {min: 1, max: 6}
      );

      const total = selectedProducts.reduce(
        (sum, product) => sum + product.price,
        0
      );

      return {
        date: faker.date.past(),
        products: selectedProducts.map(product => product._id),
        total,
      };
    });

    const orderCreated = await orderModel.insertMany(orders);

    console.log("Categorias criadas: ", categoriesCreated.length);
    console.log("Produtos criados: ", productsCreated.length);
    console.log("Orders criados: ", orderCreated.length);

  }catch(error){
    console.error("seed error: ", error);
    process.exit(1);
  }finally{
    await mongoose.disconnect();
  }

}

seed();