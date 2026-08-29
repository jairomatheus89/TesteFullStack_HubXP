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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const products_schema_1 = require("./schema/products.schema");
const category_schema_1 = require("../category/schema/category.schema");
let ProductsService = class ProductsService {
    productModel;
    categoryModel;
    constructor(productModel, categoryModel) {
        this.productModel = productModel;
        this.categoryModel = categoryModel;
    }
    async postProduct(data) {
        const categories = await this.categoryModel.find({
            _id: { $in: data.categoryIds },
        });
        if (categories.length !== data.categoryIds.length) {
            throw new common_1.NotFoundException("Uma ou mais categorias não existem...");
        }
        const product = new this.productModel(data);
        return product.save();
    }
    async getProduct(data) {
        const category = await this.productModel.findById(data.id);
        return category;
    }
    async patchProduct(data) {
        const dataUpdate = {};
        if (data.categoryIds !== undefined) {
            const categories = await this.categoryModel.find({
                _id: { $in: data.categoryIds },
            });
            if (data.categoryIds.length == 0) {
                throw new common_1.BadRequestException("O Produto deve ter pelo menos UMA categoria...");
            }
            if (categories.length !== data.categoryIds.length) {
                throw new common_1.NotFoundException("Uma ou mais categorias não existem...");
            }
            dataUpdate.categoryIds = data.categoryIds;
        }
        if (data.name !== undefined) {
            dataUpdate.name = data.name;
        }
        if (data.description !== undefined) {
            dataUpdate.description = data.description;
        }
        if (data.price !== undefined) {
            dataUpdate.price = data.price;
        }
        if (data.imageUrl !== undefined) {
            dataUpdate.imageUrl = data.imageUrl;
        }
        const product = await this.productModel.findByIdAndUpdate(data.id, dataUpdate, { returnDocument: 'after' });
        if (product == null) {
            throw new common_1.NotFoundException("Product já não existe mais...");
        }
        return {
            status: "Produto atualizado!",
            product: product
        };
    }
    async removeProduct(data) {
        const product = await this.productModel.findByIdAndDelete(data.id, { returnDocument: 'after' });
        if (product == null) {
            throw new common_1.NotFoundException("Produto não existente");
        }
        return {
            status: "Produto Deletado!",
            produto: product
        };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(products_schema_1.Product.name)),
    __param(1, (0, mongoose_1.InjectModel)(category_schema_1.Category.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ProductsService);
//# sourceMappingURL=products.service.js.map