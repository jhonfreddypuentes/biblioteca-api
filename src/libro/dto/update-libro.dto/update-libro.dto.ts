import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateLibroDto {
  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  autor?: string;

  @IsOptional()
  @IsString()
  fechaPublicacion?: string;

  @IsOptional()
  @IsString()
  isbn?: string;
}
