import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @ApiOperation({ summary: 'Register a new user' })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @ApiOperation({ summary: 'Login and get JWT' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Guard redirects to Google
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    // req.user is set by GoogleStrategy.validate
    const { email, displayName, googleId } = (req as any).user;
    // Find or create user in DB (pseudo, implement in service)
    const user = await this.authService.validateOrCreateGoogleUser({
      email,
      displayName,
      googleId,
    });
    // Issue JWT
    // log the jwt secret
    console.log('JWT_SECRET in google callback:', process.env.JWT_SECRET);
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    console.log({ token });
    // Redirect to frontend with token in URL param
    res.redirect(`http://localhost:8080/login?token=${token}`);
  }
}
