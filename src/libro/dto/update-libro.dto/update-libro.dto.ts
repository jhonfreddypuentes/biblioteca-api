import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateLibroDto {
  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  autor?: string;

  @IsOptional()
  @IsDateString({}, { message: 'fechaPublicacion debe ser una fecha válida en formato ISO (YYYY-MM-DD)' })
  fechaPublicacion?: string;

  @IsOptional()
  @IsString()
  isbn?: string;
}
