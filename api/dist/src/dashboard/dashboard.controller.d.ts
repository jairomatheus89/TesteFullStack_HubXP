import { DashboardService } from "./dashboard.service";
import { DashboardFilterDto } from "./dto/dashboard-filter.dto";
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    valorTotal(filter: DashboardFilterDto): Promise<{
        valorTotal: any;
        valorMedio: number;
        totalPedidos: any;
    }>;
}
