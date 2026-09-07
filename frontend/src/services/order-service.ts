import { apiService } from "./api-service";

export const orderService = {

  async getAllOrders() {
    const response = await apiService.get("/order/all");

    return response.data;
  },
  async deleteOrder(orderId: string){
    const response = await apiService.delete("/order",{
      data:{
        id: orderId
      }
    });

    return response.data;
  }
}