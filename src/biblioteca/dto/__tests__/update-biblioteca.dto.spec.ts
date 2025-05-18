
import { validateDTO } from '../../../../test/utils/validate-dto';
import { UpdateBibliotecaDto } from '../update-biblioteca.dto/update-biblioteca.dto';

describe('UpdateBibliotecaDto', () => {
  it('puede ser vacío sin errores', async () => {
    const dto = new UpdateBibliotecaDto();
    const errors = await validateDTO(dto);
    expect(errors.length).toBe(0);
  });

  it('valida formato correcto de hora si se incluye', async () => {
    const dto = new UpdateBibliotecaDto();
    dto.horaApertura = '25:00'; // inválida
    dto.horaCierre = '09:99';   // inválida

    const errors = await validateDTO(dto);
    expect(errors.some(e => e.includes('horaApertura'))).toBeTruthy();
    expect(errors.some(e => e.includes('horaCierre'))).toBeTruthy();
  });

  it('acepta datos válidos si se incluyen', async () => {
    const dto = new UpdateBibliotecaDto();
    dto.nombre = 'Nueva biblioteca';
    dto.horaApertura = '09:00';

    const errors = await validateDTO(dto);
    expect(errors.length).toBe(0);
  });
});
