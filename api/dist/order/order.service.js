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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_schema_1 = require("./schema/order.schema");
const products_schema_1 = require("../products/schema/products.schema");
const create_order_dto_1 = require("./dto/create-order.dto");
const get_order_dto_1 = require("./dto/get-order.dto");
const patch_order_dto_1 = require("./dto/patch-order.dto");
let OrderService = class OrderService {
    orderModel;
    productModel;
    constructor(orderModel, productModel) {
        this.orderModel = orderModel;
        this.productModel = productModel;
    }
    async createOrder(dto) {
        const products = await this.productModel.find({
            _id: { $in: dto.products },
        });
        if (products.length !== new Set(dto.products).size) {
            throw new common_1.NotFoundException("Um ou mais produtos nao estão disponiveis ou não existem...");
        }
        if (products.length < 1)
            throw new common_1.BadRequestException("A compra deve conter pelo menos UM produto...");
        const total = dto.products.reduce((sum, productId) => {
            const product = products.find(product => product._id.toString() === productId);
            if (!product) {
                throw new common_1.NotFoundException("Um ou mais produtos nao estao disponiveis ou nao existem...");
            }
            return sum + product.price;
        }, 0);
        const order = new this.orderModel({
            products: products,
            total: total
        });
        return order.save();
    }
    async getOrder(dto) {
        const order = await this.orderModel.findById(dto.orderId);
        if (!order) {
            throw new common_1.NotFoundException("Ordem ja nao existe mais...");
        }
        return order;
    }
    async putOrder(dto) {
        const products = await this.productModel.find({
            _id: { $in: dto.products },
        });
        if (products.length !== new Set(dto.products).size) {
            throw new common_1.NotFoundException("Um ou mais produtos nao estão disponiveis ou não existem...");
        }
        if (products.length < 1)
            throw new common_1.BadRequestException("A compra deve conter pelo menos UM produto...");
        const total = dto.products.reduce((sum, productId) => {
            const product = products.find(product => product._id.toString() === productId);
            if (!product) {
                throw new common_1.NotFoundException("Um ou mais produtos nao estao disponiveis ou nao existem...");
            }
            return sum + product.price;
        }, 0);
        const order = await this.orderModel.findByIdAndUpdate(dto.id, {
            products: dto.products,
            total: total
        }, { returnDocument: 'after' });
        if (!order) {
            throw new common_1.NotFoundException("Order não existe mais...");
        }
        return {
            status: "Compra atualizada",
            order: order
        };
    }
    async removeOrder(dto) {
        const order = await this.orderModel.findByIdAndDelete(dto.orderId, { returnDocument: 'after' });
        if (!order) {
            throw new common_1.NotFoundException("Essa order ja não existe mais...");
        }
        return {
            status: "Order Removida!",
            order: order
        };
    }
};
exports.OrderService = OrderService;
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.OrderCreateDto]),
    __metadata("design:returntype", Promise)
], OrderService.prototype, "createOrder", null);
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_order_dto_1.OrderIdDto]),
    __metadata("design:returntype", Promise)
], OrderService.prototype, "getOrder", null);
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [patch_order_dto_1.OrderPatchDto]),
    __metadata("design:returntype", Promise)
], OrderService.prototype, "putOrder", null);
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_order_dto_1.OrderIdDto]),
    __metadata("design:returntype", Promise)
], OrderService.prototype, "removeOrder", null);
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __param(1, (0, mongoose_1.InjectModel)(products_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], OrderService);
//# sourceMappingURL=order.service.js.map