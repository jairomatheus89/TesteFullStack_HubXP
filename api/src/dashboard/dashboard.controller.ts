import { Body, Controller, Delete, Get, Patch, Post, Query } from "@nestjs/common";
import { DashboardService } from "./dashboard.service";

//DTOs
import { DashboardFilterDto } from "./dto/dashboard-filter.dto";

@Controller('dashboard')
export class DashboardController{

  constructor (
    private readonly dashboardService: DashboardService
  ){}

  @Get()
  valorTotal(@Query() filter: DashboardFilterDto){
    return this.dashboardService.ordersAggregation(filter);
  }

}