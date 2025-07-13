"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const character_service_1 = require("./character.service");
const character_controller_1 = require("./character.controller");
const character_entity_1 = require("../entities/character.entity");
const user_entity_1 = require("../entities/user.entity");
let CharacterModule = class CharacterModule {
};
exports.CharacterModule = CharacterModule;
exports.CharacterModule = CharacterModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([character_entity_1.Character, user_entity_1.User])],
        controllers: [character_controller_1.CharacterController],
        providers: [character_service_1.CharacterService],
    })
], CharacterModule);
//# sourceMappingURL=character.module.js.map