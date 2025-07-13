import { Module } from '@nestjs/common';
import { CreatureService } from './creature.service';
import { CreatureController } from './creature.controller';

@Module({
  controllers: [CreatureController],
  providers: [CreatureService],
})
export class CreatureModule {}
