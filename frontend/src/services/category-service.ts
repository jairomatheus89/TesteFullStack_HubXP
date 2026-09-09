import { apiService } from "./api-service";

export const categoryService = {

  async getAllCategories() {
    const response = await apiService.get("/category/all");

    return response.data;
  },
  async deleteCategory(categoryId: string){
    const response = await apiService.delete("/category",{
      data:{
        id: categoryId
      }
    });

    return response.data;
  },
  async editCategory(categoryId: string, name: string){
    const response = await apiService.put("/category",{
      id: categoryId,
      name: name
    });

    return response.data;
  },
  async createCategory(name: string){
    const response = await apiService.post("/category", {
      name: name
    });

    return response.data;
  }
}