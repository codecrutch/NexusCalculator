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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cave = void 0;
const typeorm_1 = require("typeorm");
const creature_entity_1 = require("./creature.entity");
let Cave = class Cave {
    id;
    cavename;
    requirements;
    coordinates;
    boss;
    drops;
    creatures;
    created_at;
    updated_at;
};
exports.Cave = Cave;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Cave.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Cave.prototype, "cavename", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Cave.prototype, "requirements", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Cave.prototype, "coordinates", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Cave.prototype, "boss", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Cave.prototype, "drops", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => creature_entity_1.Creature, (creature) => creature.cave),
    __metadata("design:type", Array)
], Cave.prototype, "creatures", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Cave.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Cave.prototype, "updated_at", void 0);
exports.Cave = Cave = __decorate([
    (0, typeorm_1.Entity)('caves')
], Cave);
//# sourceMappingURL=cave.entity.js.map