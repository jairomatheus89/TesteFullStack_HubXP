import { Body, Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { DashboardService } from "./dashboard.service";

@Controller('dashboard')
export class DashboardController{

  constructor (
    private readonly dashboardService: DashboardService
  ){}

  @Get('valortotal')
  valorTotal(){
    return this.dashboardService.valorTotalOrders();
  }

  @Get('valorMedio')
  valorMedio(){
    return this.dashboardService.valorMedioOrders();
  }

  @Get('totalPedidos')
  totalPedidos(){
    return this.dashboardService.totalOrders();
  }

}