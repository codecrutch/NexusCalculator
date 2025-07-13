import { IsInt, IsString, IsOptional, Min, IsNotEmpty } from 'class-validator';

export class CreateCharacterDto {
  @IsString()
  @IsNotEmpty()
  path: string;

  @IsString()
  @IsOptional()
  subpath?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(0)
  vita: number;

  @IsInt()
  @Min(0)
  mana: number;

  @IsInt()
  @Min(0)
  might: number;

  @IsInt()
  @Min(0)
  will: number;

  @IsInt()
  @Min(0)
  grace: number;

  @IsString()
  @IsNotEmpty()
  alignment: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  clan?: string;

  @IsString()
  @IsOptional()
  clantitle?: string;

  @IsString()
  @IsOptional()
  imagelocation?: string;

  @IsInt()
  userId: number;
}
