import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { Character } from '../entities/character.entity';
import { User } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Character, User])],
  controllers: [CharacterController],
  providers: [CharacterService],
})
export class CharacterModule {}
