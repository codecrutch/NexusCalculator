import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
interface GoogleUserProfile {
    email: string;
    displayName: string;
    googleId: string;
}
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            name: any;
            discriminator: any;
        };
    }>;
    register(dto: CreateUserDto): Promise<User>;
    validateOrCreateGoogleUser({ email, displayName, googleId, }: GoogleUserProfile): Promise<User>;
}
export {};
