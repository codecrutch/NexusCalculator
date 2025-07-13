import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateCaveDto {
  @IsString()
  @IsNotEmpty()
  cavename: string;

  @IsString()
  @IsOptional()
  requirements?: string;

  @IsString()
  @IsOptional()
  coordinates?: string;

  @IsString()
  @IsOptional()
  boss?: string;

  @IsString()
  @IsOptional()
  drops?: string;
}
