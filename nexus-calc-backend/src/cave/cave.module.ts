import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaveService } from './cave.service';
import { CaveController } from './cave.controller';
import { Cave } from '../entities/cave.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cave])],
  controllers: [CaveController],
  providers: [CaveService],
})
export class CaveModule {}
