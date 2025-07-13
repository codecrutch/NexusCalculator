import { IsInt, IsString, IsOptional, Min, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCharacterDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  path: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  subpath?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  vita: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  mana: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  might: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  will: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  grace: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  alignment: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  clan?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  clantitle?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  imagelocation?: string;

  @ApiProperty()
  @IsInt()
  userId: number;
}
