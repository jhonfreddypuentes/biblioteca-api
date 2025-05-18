import { validateDTO } from '../../../../test/utils/validate-dto';
import { CreateBibliotecaDto } from '../create-biblioteca.dto/create-biblioteca.dto';

describe('CreateBibliotecaDto', () => {
  it('debe ser válido con datos correctos', async () => {
    const dto = new CreateBibliotecaDto();
    dto.nombre = 'Biblioteca Central';
    dto.direccion = 'Cra 123';
    dto.ciudad = 'Bogotá';
    dto.horaApertura = '08:00';
    dto.horaCierre = '18:00';

    const errors = await validateDTO(dto);
    expect(errors.length).toBe(0);
  });

  it('debe fallar si hora tiene formato inválido', async () => {
    const dto = new CreateBibliotecaDto();
    dto.nombre = 'Biblioteca Central';
    dto.direccion = 'Cra 123';
    dto.ciudad = 'Bogotá';
    dto.horaApertura = '25:00'; // inválida
    dto.horaCierre = '99:99';   // inválida

    const errors = await validateDTO(dto);
    expect(errors).toContain('horaApertura debe tener el formato HH:mm');
    expect(errors).toContain('horaCierre debe tener el formato HH:mm');
  });
});
