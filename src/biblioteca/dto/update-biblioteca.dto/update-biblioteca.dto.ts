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
  @Matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, {
    message: 'horaApertura debe tener el formato HH:mm',
  })
  horaApertura?: string;

  @IsOptional()
  @Matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, {
    message: 'horaCierre debe tener el formato HH:mm',
  })
  horaCierre?: string;
}
