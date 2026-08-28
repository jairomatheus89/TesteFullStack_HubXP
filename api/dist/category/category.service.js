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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const category_schema_1 = require("./schema/category.schema");
let CategoryService = class CategoryService {
    categoryModel;
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }
    async registerCategory(data) {
        const categoryExisted = await this.categoryModel.findOne(data);
        if (categoryExisted != null) {
            return {
                status: "Categoria ja existente!"
            };
        }
        const category = new this.categoryModel(data);
        return category.save();
    }
    async getCategory(data) {
        const category = await this.categoryModel.findById(data.id);
        return category;
    }
    async patchCategory(data) {
        const category = await this.categoryModel.findByIdAndUpdate(data.id, {
            name: data.name
        }, { returnDocument: 'after' });
        if (category == null) {
            throw new common_1.NotFoundException("Categoria ja nao existe mais...");
        }
        return category;
    }
    async removeCategory(data) {
        const category = await this.categoryModel.findByIdAndDelete(data.id, { returnDocument: 'after' });
        if (category == null) {
            return {
                status: "Categoria não encontrada ou inexistente!",
            };
        }
        return {
            status: "Categoria deletada!",
            categoria: category
        };
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(category_schema_1.Category.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CategoryService);
//# sourceMappingURL=category.service.js.map