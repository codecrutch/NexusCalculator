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
exports.CaveController = void 0;
const common_1 = require("@nestjs/common");
const cave_service_1 = require("./cave.service");
const create_cave_dto_1 = require("./dto/create-cave.dto");
const update_cave_dto_1 = require("./dto/update-cave.dto");
const swagger_1 = require("@nestjs/swagger");
let CaveController = class CaveController {
    caveService;
    constructor(caveService) {
        this.caveService = caveService;
    }
    create(createCaveDto) {
        return this.caveService.create(createCaveDto);
    }
    findAll() {
        return this.caveService.findAll();
    }
    findOne(id) {
        return this.caveService.findOne(+id);
    }
    update(id, updateCaveDto) {
        return this.caveService.update(+id, updateCaveDto);
    }
    remove(id) {
        return this.caveService.remove(+id);
    }
};
exports.CaveController = CaveController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new cave' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cave_dto_1.CreateCaveDto]),
    __metadata("design:returntype", void 0)
], CaveController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all caves' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CaveController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get a cave by id' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CaveController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update a cave by id' }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_cave_dto_1.UpdateCaveDto]),
    __metadata("design:returntype", void 0)
], CaveController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a cave by id' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CaveController.prototype, "remove", null);
exports.CaveController = CaveController = __decorate([
    (0, swagger_1.ApiTags)('caves'),
    (0, common_1.Controller)('caves'),
    __metadata("design:paramtypes", [cave_service_1.CaveService])
], CaveController);
//# sourceMappingURL=cave.controller.js.map