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
exports.CharacterService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const character_entity_1 = require("../entities/character.entity");
const user_entity_1 = require("../entities/user.entity");
let CharacterService = class CharacterService {
    characterRepository;
    userRepository;
    constructor(characterRepository, userRepository) {
        this.characterRepository = characterRepository;
        this.userRepository = userRepository;
    }
    async create(createCharacterDto) {
        const user = await this.userRepository.findOneBy({
            id: createCharacterDto.userId,
        });
        if (!user)
            throw new Error('User not found');
        const character = this.characterRepository.create({
            ...createCharacterDto,
            user,
        });
        return this.characterRepository.save(character);
    }
    async findAll() {
        return this.characterRepository.find({ relations: ['user'] });
    }
    async findOne(id) {
        return this.characterRepository.findOne({
            where: { id },
            relations: ['user'],
        });
    }
    async update(id, updateCharacterDto) {
        const updateData = { ...updateCharacterDto };
        if (updateCharacterDto.userId) {
            const user = await this.userRepository.findOneBy({
                id: updateCharacterDto.userId,
            });
            if (!user)
                throw new Error('User not found');
            updateData.user = user;
        }
        await this.characterRepository.update(id, updateData);
        return this.characterRepository.findOne({
            where: { id },
            relations: ['user'],
        });
    }
    async remove(id) {
        await this.characterRepository.delete(id);
    }
};
exports.CharacterService = CharacterService;
exports.CharacterService = CharacterService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(character_entity_1.Character)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CharacterService);
//# sourceMappingURL=character.service.js.map