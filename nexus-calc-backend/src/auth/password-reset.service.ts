import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { PasswordResetToken } from './entities/password-reset-token.entity';
import * as crypto from 'crypto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class PasswordResetService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(PasswordResetToken)
    private passwordResetTokenRepository: Repository<PasswordResetToken>,
  ) {}

  async generateResetToken(email: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      // Don't reveal if user exists or not for security
      return {
        message:
          'If an account with this email exists, a password reset link has been sent.',
      };
    }

    // Check if user has a password (not Google OAuth)
    if (!user.encrypted_password) {
      throw new BadRequestException(
        'This account uses Google login. Please use the "Login with Google" option instead.',
      );
    }

    // Generate a random token
    const token = crypto.randomBytes(32).toString('hex');

    // Set expiration to 1 hour from now
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    // Delete any existing tokens for this user
    await this.passwordResetTokenRepository.delete({ userId: user.id });

    // Create new token
    const resetToken = this.passwordResetTokenRepository.create({
      token,
      userId: user.id,
      expiresAt,
    });

    await this.passwordResetTokenRepository.save(resetToken);

    // TODO: Send email with reset link
    // For now, just return success message
    console.log(`Password reset token for ${email}: ${token}`);

    return {
      message:
        'If an account with this email exists, a password reset link has been sent.',
    };
  }

  async resetPassword(
    token: string,
    newPassword: string,
  ): Promise<{ message: string }> {
    const resetToken = await this.passwordResetTokenRepository.findOne({
      where: { token },
      relations: ['user'],
    });

    if (!resetToken) {
      throw new BadRequestException('Invalid or expired reset token.');
    }

    if (resetToken.expiresAt < new Date()) {
      // Clean up expired token
      await this.passwordResetTokenRepository.delete({ id: resetToken.id });
      throw new BadRequestException('Reset token has expired.');
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    await this.userRepository.update(resetToken.userId, {
      encrypted_password: hashedPassword,
    });

    // Delete the used token
    await this.passwordResetTokenRepository.delete({ id: resetToken.id });

    return { message: 'Password has been reset successfully.' };
  }

  async validateResetToken(
    token: string,
  ): Promise<{ valid: boolean; message?: string }> {
    const resetToken = await this.passwordResetTokenRepository.findOne({
      where: { token },
    });

    if (!resetToken) {
      return { valid: false, message: 'Invalid reset token.' };
    }

    if (resetToken.expiresAt < new Date()) {
      // Clean up expired token
      await this.passwordResetTokenRepository.delete({ id: resetToken.id });
      return { valid: false, message: 'Reset token has expired.' };
    }

    return { valid: true };
  }
}
