import { PartialType } from '@nestjs/mapped-types';
import { CreateCaveDto } from './create-cave.dto';

export class UpdateCaveDto extends PartialType(CreateCaveDto) {}
