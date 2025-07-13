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
exports.CreatureController = void 0;
const common_1 = require("@nestjs/common");
const creature_service_1 = require("./creature.service");
const create_creature_dto_1 = require("./dto/create-creature.dto");
const update_creature_dto_1 = require("./dto/update-creature.dto");
let CreatureController = class CreatureController {
    creatureService;
    constructor(creatureService) {
        this.creatureService = creatureService;
    }
    create(createCreatureDto) {
        return this.creatureService.create(createCreatureDto);
    }
    findAll() {
        return this.creatureService.findAll();
    }
    findOne(id) {
        return this.creatureService.findOne(+id);
    }
    update(id, updateCreatureDto) {
        return this.creatureService.update(+id, updateCreatureDto);
    }
    remove(id) {
        return this.creatureService.remove(+id);
    }
};
exports.CreatureController = CreatureController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_creature_dto_1.CreateCreatureDto]),
    __metadata("design:returntype", void 0)
], CreatureController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CreatureController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CreatureController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_creature_dto_1.UpdateCreatureDto]),
    __metadata("design:returntype", void 0)
], CreatureController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CreatureController.prototype, "remove", null);
exports.CreatureController = CreatureController = __decorate([
    (0, common_1.Controller)('creature'),
    __metadata("design:paramtypes", [creature_service_1.CreatureService])
], CreatureController);
//# sourceMappingURL=creature.controller.js.map