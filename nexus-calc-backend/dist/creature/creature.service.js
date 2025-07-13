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
exports.CreatureService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const creature_entity_1 = require("../entities/creature.entity");
const cave_entity_1 = require("../entities/cave.entity");
let CreatureService = class CreatureService {
    creatureRepository;
    caveRepository;
    constructor(creatureRepository, caveRepository) {
        this.creatureRepository = creatureRepository;
        this.caveRepository = caveRepository;
    }
    async create(createCreatureDto) {
        const cave = await this.caveRepository.findOneBy({
            id: createCreatureDto.caveId,
        });
        if (!cave)
            throw new Error('Cave not found');
        const creature = this.creatureRepository.create({
            ...createCreatureDto,
            cave,
        });
        return this.creatureRepository.save(creature);
    }
    async findAll() {
        return this.creatureRepository.find({ relations: ['cave'] });
    }
    async findOne(id) {
        return this.creatureRepository.findOne({
            where: { id },
            relations: ['cave'],
        });
    }
    async update(id, updateCreatureDto) {
        const updateData = { ...updateCreatureDto };
        if (updateCreatureDto.caveId) {
            const cave = await this.caveRepository.findOneBy({
                id: updateCreatureDto.caveId,
            });
            if (!cave)
                throw new Error('Cave not found');
            updateData.cave = cave;
        }
        await this.creatureRepository.update(id, updateData);
        return this.creatureRepository.findOne({
            where: { id },
            relations: ['cave'],
        });
    }
    async remove(id) {
        await this.creatureRepository.delete(id);
    }
};
exports.CreatureService = CreatureService;
exports.CreatureService = CreatureService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(creature_entity_1.Creature)),
    __param(1, (0, typeorm_1.InjectRepository)(cave_entity_1.Cave)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CreatureService);
//# sourceMappingURL=creature.service.js.map