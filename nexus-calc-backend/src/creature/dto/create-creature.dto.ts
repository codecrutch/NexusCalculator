import { IsInt, IsString, IsOptional, Min, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCreatureDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  creaturename: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  vita: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  ac: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  imagelocation?: string;

  @ApiProperty()
  @IsInt()
  caveId: number;
}
