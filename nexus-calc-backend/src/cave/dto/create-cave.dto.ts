import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCaveDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cavename: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  requirements?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  coordinates?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  boss?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  drops?: string;
}
