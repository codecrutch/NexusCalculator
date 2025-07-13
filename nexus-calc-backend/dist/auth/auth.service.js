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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcryptjs");
const user_entity_1 = require("../entities/user.entity");
let AuthService = class AuthService {
    userRepository;
    jwtService;
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (user && (await bcrypt.compare(password, user.encrypted_password))) {
            const { encrypted_password, ...result } = user;
            return result;
        }
        return null;
    }
    async login(loginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                discriminator: user.discriminator,
            },
        };
    }
    async register(dto) {
        const existingEmail = await this.userRepository.findOne({
            where: { email: dto.email },
        });
        if (existingEmail) {
            throw new common_1.BadRequestException('Email is already registered');
        }
        const existing = await this.userRepository.find({
            where: { name: dto.name },
        });
        const used = new Set(existing.map((u) => u.discriminator));
        let discriminator = dto.discriminator;
        if (!discriminator) {
            for (let i = 1; i <= 9999; i++) {
                const d = i.toString().padStart(4, '0');
                if (!used.has(d)) {
                    discriminator = d;
                    break;
                }
            }
            if (!discriminator) {
                throw new common_1.BadRequestException('All discriminators taken for this username');
            }
        }
        else if (used.has(discriminator)) {
            throw new common_1.BadRequestException('That username and discriminator is already taken');
        }
        const user = this.userRepository.create({
            email: dto.email,
            name: dto.name,
            discriminator,
        });
        const hash = await bcrypt.hash(dto.password, 10);
        user.encrypted_password = hash;
        return this.userRepository.save(user);
    }
    async validateOrCreateGoogleUser({ email, displayName, googleId, }) {
        let user = await this.userRepository.findOne({ where: { email } });
        if (user)
            return user;
        const baseName = displayName?.replace(/[^a-zA-Z0-9]/g, '') || 'GoogleUser';
        const existing = await this.userRepository.find({
            where: { name: baseName },
        });
        const used = new Set(existing.map((u) => u.discriminator));
        let discriminator = null;
        for (let i = 1; i <= 9999; i++) {
            const d = i.toString().padStart(4, '0');
            if (!used.has(d)) {
                discriminator = d;
                break;
            }
        }
        if (!discriminator)
            throw new Error('All discriminators taken for this username');
        user = this.userRepository.create({
            email,
            name: baseName,
            discriminator,
            encrypted_password: '',
        });
        return this.userRepository.save(user);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map