"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_schema_1 = require("../order/schema/order.schema");
let DashboardService = class DashboardService {
    orderModel;
    constructor(orderModel) {
        this.orderModel = orderModel;
    }
    async ordersAggregation(filter) {
        const match = {};
        const pipeline = [];
        if (filter.startDate || filter.endDate) {
            match.date = {};
            if (filter.startDate) {
                match.date.$gte = new Date(filter.startDate);
            }
            if (filter.endDate) {
                match.date.$lte = new Date(filter.endDate);
            }
        }
        if (filter.productId) {
            match.products = new mongoose_2.Types.ObjectId(filter.productId);
        }
        if (filter.categoryId) {
            pipeline.push({
                $lookup: {
                    from: "products",
                    let: {
                        productIds: "$products"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: [
                                        "$_id", { $ifNull: ["$$productIds", []] }
                                    ]
                                },
                                categoryIds: new mongoose_2.Types.ObjectId(filter.categoryId)
                            }
                        }
                    ],
                    as: "productData"
                }
            });
            pipeline.push({
                $match: {
                    "productData.0": { $exists: true }
                }
            });
        }
        const [result] = await this.orderModel.aggregate([
            {
                $match: match
            },
            ...pipeline,
            {
                $group: {
                    _id: null,
                    valorTotal: { $sum: "$total" },
                    valorMedio: { $avg: "$total" },
                    totalPedidos: { $sum: 1 }
                },
            },
        ]);
        return {
            valorTotal: result?.valorTotal ?? 0,
            valorMedio: result?.valorMedio ? Number(result.valorMedio.toFixed(2)) : 0,
            totalPedidos: result?.totalPedidos ?? 0
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map