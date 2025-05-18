import { IsOptional, IsString, Matches } from 'class-validator';

export class UpdateBibliotecaDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  direccion?: string;

  @IsOptional()
  @IsString()
  ciudad?: string;

  @IsOptional()
  @IsString()
  horaApertura?: string;

  @IsOptional()
  @IsString()
  horaCierre?: string;
}
