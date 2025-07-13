import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreatureService } from './creature.service';
import { CreatureController } from './creature.controller';
import { Creature } from '../entities/creature.entity';
import { Cave } from '../entities/cave.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Creature, Cave])],
  controllers: [CreatureController],
  providers: [CreatureService],
})
export class CreatureModule {}
