import { Module } from '@nestjs/common';
import { CaveService } from './cave.service';
import { CaveController } from './cave.controller';

@Module({
  controllers: [CaveController],
  providers: [CaveService],
})
export class CaveModule {}
