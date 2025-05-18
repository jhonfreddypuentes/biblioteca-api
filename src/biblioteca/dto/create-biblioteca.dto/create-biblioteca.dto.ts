import { IsString, Matches } from 'class-validator';

export class CreateBibliotecaDto {
  @IsString()
  nombre: string;

  @IsString()
  direccion: string;

  @IsString()
  ciudad: string;

  @Matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, {
    message: 'horaApertura debe tener el formato HH:mm',
  })
  horaApertura: string;
  
  @Matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, {
    message: 'horaCierre debe tener el formato HH:mm',
  })
  horaCierre: string;
}
