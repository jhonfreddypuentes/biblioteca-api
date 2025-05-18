import { Test, TestingModule } from '@nestjs/testing';
import { LibroController } from '../libro.controller';
import { LibroService } from '../libro.service';
import { CreateLibroDto } from '../dto/create-libro.dto/create-libro.dto';

describe('LibroController', () => {
  let controller: LibroController;
  let service: LibroService;

  const mockService = {
    findAll: jest.fn().mockResolvedValue([{ id: 1, titulo: 'Cien años' }]),
    findOne: jest.fn().mockResolvedValue({ id: 1, titulo: 'Cien años' }),
    create: jest.fn().mockResolvedValue({ id: 1, titulo: 'Cien años' }),
    update: jest.fn().mockResolvedValue({ id: 1, titulo: 'Actualizado' }),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LibroController],
      providers: [{ provide: LibroService, useValue: mockService }],
    }).compile();

    controller = module.get<LibroController>(LibroController);
    service = module.get<LibroService>(LibroService);
  });

  it('debe retornar todos los libros', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([{ id: 1, titulo: 'Cien años' }]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('debe retornar un libro por ID', async () => {
    const result = await controller.findOne(1);
    expect(result).toEqual({ id: 1, titulo: 'Cien años' });
  });

  it('debe crear un libro', async () => {
    const dto: CreateLibroDto = {
      titulo: 'Cien años',
      autor: 'Gabo',
      fechaPublicacion: '2020-01-01',
      isbn: '123456789',
    };
    const result = await controller.create(dto);
    expect(result).toEqual({ id: 1, titulo: 'Cien años' });
  });

  it('debe actualizar un libro', async () => {
    const result = await controller.update(1, { titulo: 'Actualizado' });
    expect(result).toEqual({ id: 1, titulo: 'Actualizado' });
  });

  it('debe eliminar un libro', async () => {
    await expect(controller.delete(1)).resolves.toBeUndefined();
  });
});
