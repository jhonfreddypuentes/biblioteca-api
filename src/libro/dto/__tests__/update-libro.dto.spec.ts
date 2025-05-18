
import { validateDTO } from '../../../../test/utils/validate-dto';
import { UpdateLibroDto } from '../update-libro.dto/update-libro.dto';

describe('UpdateLibroDto', () => {
  it('puede ser vacío sin errores', async () => {
    const dto = new UpdateLibroDto();
    const errors = await validateDTO(dto);
    expect(errors.length).toBe(0);
  });

  it('valida formato si se incluye fecha inválida', async () => {
    const dto = new UpdateLibroDto();
    dto.fechaPublicacion = 'no-fecha';

    const errors = await validateDTO(dto);
    expect(errors.some(e => e.includes('fechaPublicacion'))).toBeTruthy();
  });

  it('acepta campos válidos individuales', async () => {
    const dto = new UpdateLibroDto();
    dto.isbn = '123-456-789';

    const errors = await validateDTO(dto);
    expect(errors.length).toBe(0);
  });
});
