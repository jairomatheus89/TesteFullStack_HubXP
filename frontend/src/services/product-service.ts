import { apiService } from "./api-service";

export const productService = {

  async getAllProducts() {
    const response = await apiService.get("/products/all");

    return response.data;
  },
  async deleteProduct(productId: string){
    const response = await apiService.delete("/products",{
      data:{
        id: productId
      }
    });

    return response.data;
  },
  async patchProductName(productId: string, name: string){
    const response = await apiService.patch("/products", {
      id: productId,
      name: name
    });

    return response.data;
  },
  async patchProductDesc(productId: string, desc: string){
    const response = await apiService.patch("/products", {
      id: productId,
      description: desc
    });

    return response.data;
  },
  async patchProductPrice(productId: string, price: number){
    const response = await apiService.patch("/products", {
      id: productId,
      price: price
    });

    return response.data;
  },
  async patchProductCategories(productId: string, categoriesIds: string[]){
    const response = await apiService.patch("/products", {
      id: productId,
      categoryIds: categoriesIds
    });

    return response.data;
  }
}