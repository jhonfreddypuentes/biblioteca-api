import { Test, TestingModule } from '@nestjs/testing';
import { BibliotecaLibroService } from '../biblioteca-libro.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Biblioteca } from '../../biblioteca/biblioteca/biblioteca';
import { Libro } from '../../libro/libro/libro';

describe('BibliotecaLibroService', () => {
  let service: BibliotecaLibroService;
  let bibliotecaRepo: Repository<Biblioteca>;
  let libroRepo: Repository<Libro>;

  const mockBibliotecaRepo = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  const mockLibroRepo = {
    findOne: jest.fn(),
    findByIds: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BibliotecaLibroService,
        {
          provide: getRepositoryToken(Biblioteca),
          useValue: mockBibliotecaRepo,
        },
        {
          provide: getRepositoryToken(Libro),
          useValue: mockLibroRepo,
        },
      ],
    }).compile();

    service = module.get<BibliotecaLibroService>(BibliotecaLibroService);
    bibliotecaRepo = module.get(getRepositoryToken(Biblioteca));
    libroRepo = module.get(getRepositoryToken(Libro));
  });

  afterEach(() => jest.clearAllMocks());

  it('addBookToLibrary lanza error si no existe la biblioteca', async () => {
    mockBibliotecaRepo.findOne.mockResolvedValue(null);

    await expect(service.addBookToLibrary(1, 1)).rejects.toThrow(NotFoundException);
  });

  it('addBookToLibrary lanza error si no existe el libro', async () => {
    mockBibliotecaRepo.findOne.mockResolvedValue({ id: 1, libros: [] });
    mockLibroRepo.findOne.mockResolvedValue(null);

    await expect(service.addBookToLibrary(1, 99)).rejects.toThrow(NotFoundException);
  });

  it('addBookToLibrary asocia libro correctamente', async () => {
    const libro = { id: 2 };
    const biblioteca = { id: 1, libros: [] };

    mockBibliotecaRepo.findOne.mockResolvedValue(biblioteca);
    mockLibroRepo.findOne.mockResolvedValue(libro);
    mockBibliotecaRepo.save.mockResolvedValue({ ...biblioteca, libros: [libro] });

    const result = await service.addBookToLibrary(1, 2);
    expect(result.libros).toContain(libro);
  });

  it('findBookFromLibrary lanza error si libro no está asociado', async () => {
    const biblioteca = { id: 1, libros: [{ id: 2 }] };
    mockBibliotecaRepo.findOne.mockResolvedValue(biblioteca);

    await expect(service.findBookFromLibrary(1, 99)).rejects.toThrow(NotFoundException);
  });

  it('updateBooksFromLibrary actualiza correctamente', async () => {
    const biblioteca = { id: 1, libros: [] };
    const libros = [{ id: 1 }, { id: 2 }];
    mockBibliotecaRepo.findOne.mockResolvedValue(biblioteca);
    mockLibroRepo.findByIds.mockResolvedValue(libros);
    mockBibliotecaRepo.save.mockResolvedValue({ ...biblioteca, libros });

    const result = await service.updateBooksFromLibrary(1, [1, 2]);
    expect(result.libros).toEqual(libros);
  });

  it('deleteBookFromLibrary elimina correctamente el libro', async () => {
    const biblioteca = { id: 1, libros: [{ id: 1 }, { id: 2 }] };
    mockBibliotecaRepo.findOne.mockResolvedValue(biblioteca);
    mockBibliotecaRepo.save.mockResolvedValue({ id: 1, libros: [{ id: 2 }] });

    const result = await service.deleteBookFromLibrary(1, 1);
    expect(result.libros).toEqual([{ id: 2 }]);
  });
});
