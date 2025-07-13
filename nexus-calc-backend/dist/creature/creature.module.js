"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatureModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const creature_service_1 = require("./creature.service");
const creature_controller_1 = require("./creature.controller");
const creature_entity_1 = require("../entities/creature.entity");
const cave_entity_1 = require("../entities/cave.entity");
let CreatureModule = class CreatureModule {
};
exports.CreatureModule = CreatureModule;
exports.CreatureModule = CreatureModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([creature_entity_1.Creature, cave_entity_1.Cave])],
        controllers: [creature_controller_1.CreatureController],
        providers: [creature_service_1.CreatureService],
    })
], CreatureModule);
//# sourceMappingURL=creature.module.js.map