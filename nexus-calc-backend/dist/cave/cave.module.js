"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaveModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cave_service_1 = require("./cave.service");
const cave_controller_1 = require("./cave.controller");
const cave_entity_1 = require("../entities/cave.entity");
let CaveModule = class CaveModule {
};
exports.CaveModule = CaveModule;
exports.CaveModule = CaveModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([cave_entity_1.Cave])],
        controllers: [cave_controller_1.CaveController],
        providers: [cave_service_1.CaveService],
    })
], CaveModule);
//# sourceMappingURL=cave.module.js.map