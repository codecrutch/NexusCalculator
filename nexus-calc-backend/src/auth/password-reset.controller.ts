import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';

export class RequestPasswordResetDto {
  email: string;
}

export class ResetPasswordDto {
  token: string;
  newPassword: string;
}

export class ValidateTokenDto {
  token: string;
}

@Controller('auth')
export class PasswordResetController {
  constructor(private readonly passwordResetService: PasswordResetService) {}

  @Post('request-password-reset')
  async requestPasswordReset(@Body() dto: RequestPasswordResetDto) {
    return this.passwordResetService.generateResetToken(dto.email);
  }

  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.passwordResetService.resetPassword(dto.token, dto.newPassword);
  }

  @Get('validate-reset-token')
  async validateResetToken(@Query('token') token: string) {
    return this.passwordResetService.validateResetToken(token);
  }
}
