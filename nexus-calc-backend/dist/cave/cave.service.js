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
exports.CaveService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cave_entity_1 = require("../entities/cave.entity");
let CaveService = class CaveService {
    caveRepository;
    constructor(caveRepository) {
        this.caveRepository = caveRepository;
    }
    async create(createCaveDto) {
        const cave = this.caveRepository.create(createCaveDto);
        return this.caveRepository.save(cave);
    }
    async findAll() {
        return this.caveRepository.find({ relations: ['creatures'] });
    }
    async findOne(id) {
        return this.caveRepository.findOne({
            where: { id },
            relations: ['creatures'],
        });
    }
    async update(id, updateCaveDto) {
        await this.caveRepository.update(id, updateCaveDto);
        return this.caveRepository.findOne({
            where: { id },
            relations: ['creatures'],
        });
    }
    async remove(id) {
        await this.caveRepository.delete(id);
    }
};
exports.CaveService = CaveService;
exports.CaveService = CaveService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cave_entity_1.Cave)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CaveService);
//# sourceMappingURL=cave.service.js.map