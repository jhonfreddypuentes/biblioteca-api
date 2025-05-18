import { Test, TestingModule } from '@nestjs/testing';
import { LibroService } from '../libro.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Libro } from '../libro/libro';

describe('LibroService', () => {
  let service: LibroService;
  let repo: Repository<Libro>;

  const mockRepo = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LibroService,
        {
          provide: getRepositoryToken(Libro),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<LibroService>(LibroService);
    repo = module.get(getRepositoryToken(Libro));
  });

  afterEach(() => jest.clearAllMocks());

  it('debe lanzar error si fecha de publicación es futura', async () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);

    const dto = {
      titulo: 'Libro futuro',
      autor: 'Autor',
      fechaPublicacion: futureDate.toISOString().split('T')[0],
      isbn: '12345',
    };

    await expect(service.create(dto as any)).rejects.toThrow(BadRequestException);
  });

  it('debe lanzar error si no encuentra el libro', async () => {
    mockRepo.findOne.mockResolvedValue(undefined);
    await expect(service.findOne(123)).rejects.toThrow(NotFoundException);
  });

  it('debe crear libro válido', async () => {
    const dto = {
      titulo: 'Libro válido',
      autor: 'Autor X',
      fechaPublicacion: new Date().toISOString().split('T')[0],
      isbn: '67890',
    };

    const libroCreado = { id: 1, ...dto };

    mockRepo.create.mockReturnValue(dto);
    mockRepo.save.mockResolvedValue(libroCreado);

    const result = await service.create(dto as any);
    expect(result).toEqual(libroCreado);
    expect(mockRepo.save).toHaveBeenCalled();
  });
});
