import { apiService } from "./api-service";

export const dashboardService = {

  async getMetrics() {
    const response = await apiService.get("/dashboard");

    return response.data;
  }
}