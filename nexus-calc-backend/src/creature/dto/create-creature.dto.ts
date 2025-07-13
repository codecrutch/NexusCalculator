import { IsInt, IsString, IsOptional, Min, IsNotEmpty } from 'class-validator';

export class CreateCreatureDto {
  @IsString()
  @IsNotEmpty()
  creaturename: string;

  @IsInt()
  @Min(0)
  vita: number;

  @IsInt()
  @Min(0)
  ac: number;

  @IsString()
  @IsOptional()
  imagelocation?: string;

  @IsInt()
  caveId: number;
}
