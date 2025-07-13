import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
    });
  }

  async validate(payload: { sub: number; email: string }) {
    // Fetch the full user from the database
    const user = await this.userRepository.findOne({
      where: { id: payload.sub },
    });
    if (!user) return null;
    // Omit sensitive fields
    const safeUser: Omit<User, 'encrypted_password'> & {
      encrypted_password?: string;
    } = { ...user };
    delete safeUser.encrypted_password;
    return safeUser;
  }
}
