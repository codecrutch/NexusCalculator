import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.encrypted_password))) {
      const { encrypted_password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
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

  async register(dto: CreateUserDto) {
    // Check for duplicate email
    const existingEmail = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (existingEmail) {
      throw new BadRequestException('Email is already registered');
    }
    // Find all discriminators for this name
    const existing = await this.userRepository.find({
      where: { name: dto.name },
    });
    const used = new Set(existing.map((u) => u.discriminator));
    let discriminator = dto.discriminator;
    if (!discriminator) {
      // Generate a 4-digit discriminator
      for (let i = 1; i <= 9999; i++) {
        const d = i.toString().padStart(4, '0');
        if (!used.has(d)) {
          discriminator = d;
          break;
        }
      }
      if (!discriminator) {
        throw new BadRequestException(
          'All discriminators taken for this username',
        );
      }
    } else if (used.has(discriminator)) {
      throw new BadRequestException(
        'That username and discriminator is already taken',
      );
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
}
