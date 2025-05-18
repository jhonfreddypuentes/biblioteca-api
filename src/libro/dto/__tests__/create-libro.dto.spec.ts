import { validateDTO } from '../../../../test/utils/validate-dto';
import { CreateLibroDto } from '../create-libro.dto/create-libro.dto';

describe('CreateLibroDto', () => {
  it('debe validar un libro correcto', async () => {
    const dto = new CreateLibroDto();
    dto.titulo = 'Cien años de soledad';
    dto.autor = 'García Márquez';
    dto.fechaPublicacion = '2020-01-01';
    dto.isbn = '123456789';

    const errors = await validateDTO(dto);
    expect(errors.length).toBe(0);
  });

  it('debe fallar si fecha es inválida', async () => {
    const dto = new CreateLibroDto();
    dto.titulo = 'X';
    dto.autor = 'Y';
    dto.fechaPublicacion = 'invalid-date';
    dto.isbn = '123';

    const errors = await validateDTO(dto);
    expect(errors).toContain('fechaPublicacion must be a valid ISO 8601 date string');
  });
});
