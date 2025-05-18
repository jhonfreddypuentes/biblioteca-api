import { Test, TestingModule } from '@nestjs/testing';
import { BibliotecaLibroController } from '../biblioteca-libro.controller';
import { BibliotecaLibroService } from '../biblioteca-libro.service';

describe('BibliotecaLibroController', () => {
  let controller: BibliotecaLibroController;
  let service: BibliotecaLibroService;

  const mockService = {
    addBookToLibrary: jest.fn().mockResolvedValue({ id: 1, libros: [{ id: 1 }] }),
    findBooksFromLibrary: jest.fn().mockResolvedValue([{ id: 1 }]),
    findBookFromLibrary: jest.fn().mockResolvedValue({ id: 1 }),
    updateBooksFromLibrary: jest.fn().mockResolvedValue({ id: 1, libros: [{ id: 1 }, { id: 2 }] }),
    deleteBookFromLibrary: jest.fn().mockResolvedValue({ id: 1, libros: [] }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BibliotecaLibroController],
      providers: [{ provide: BibliotecaLibroService, useValue: mockService }],
    }).compile();

    controller = module.get<BibliotecaLibroController>(BibliotecaLibroController);
    service = module.get<BibliotecaLibroService>(BibliotecaLibroService);
  });

  it('debe asociar un libro a una biblioteca', async () => {
    const result = await controller.addBookToLibrary(1, 1);
    expect(result.libros).toContainEqual({ id: 1 });
  });

  it('debe listar los libros de una biblioteca', async () => {
    const result = await controller.findBooksFromLibrary(1);
    expect(result).toEqual([{ id: 1 }]);
  });

  it('debe obtener un libro específico de una biblioteca', async () => {
    const result = await controller.findBookFromLibrary(1, 1);
    expect(result).toEqual({ id: 1 });
  });

  it('debe actualizar la lista de libros en una biblioteca', async () => {
    const result = await controller.updateBooksFromLibrary(1, [1, 2]);
    expect(result.libros.length).toBe(2);
  });

  it('debe eliminar un libro de una biblioteca', async () => {
    const result = await controller.deleteBookFromLibrary(1, 1);
    expect(result.libros.length).toBe(0);
  });
});
