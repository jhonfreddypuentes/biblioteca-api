import { IsString, IsDateString } from 'class-validator';

export class CreateLibroDto {
  @IsString()
  titulo: string;

  @IsString()
  autor: string;

  @IsString()
  fechaPublicacion: string;

  @IsString()
  isbn: string;
}
