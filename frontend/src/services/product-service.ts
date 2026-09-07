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
  }
}