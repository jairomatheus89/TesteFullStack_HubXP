import { DashboardService } from "./dashboard.service";
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    valorTotal(): Promise<{
        valorTotal: any;
    }>;
    valorMedio(): Promise<{
        valorMedio: any;
    }>;
    totalPedidos(): Promise<{
        totalPedidos: any;
    }>;
}
