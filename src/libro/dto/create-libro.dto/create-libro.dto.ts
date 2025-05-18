import { IsString, IsDateString } from 'class-validator';

export class CreateLibroDto {
  @IsString()
  titulo: string;

  @IsString()
  autor: string;

  @IsDateString()
  fechaPublicacion: string;

  @IsString()
  isbn: string;
}
