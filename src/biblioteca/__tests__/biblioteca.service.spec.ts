import { Test, TestingModule } from '@nestjs/testing';
import { BibliotecaService } from '../biblioteca.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Biblioteca } from '../biblioteca/biblioteca';

describe('BibliotecaService', () => {
  let service: BibliotecaService;
  let repo: Repository<Biblioteca>;

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
        BibliotecaService,
        {
          provide: getRepositoryToken(Biblioteca),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<BibliotecaService>(BibliotecaService);
    repo = module.get(getRepositoryToken(Biblioteca));
  });

  afterEach(() => jest.clearAllMocks());

  it('debe lanzar error si hora de apertura es mayor a la de cierre', async () => {
    const dto = {
      nombre: 'Biblio 1',
      direccion: 'Calle 123',
      ciudad: 'Bogotá',
      horaApertura: '18:00',
      horaCierre: '08:00',
    };

    await expect(service.create(dto as any)).rejects.toThrow(BadRequestException);
  });

  it('debe lanzar error si no encuentra la biblioteca', async () => {
    mockRepo.findOne.mockResolvedValue(undefined);
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('debe crear biblioteca válida', async () => {
    const dto = {
      nombre: 'Biblio 2',
      direccion: 'Carrera 4',
      ciudad: 'Medellín',
      horaApertura: '08:00',
      horaCierre: '17:00',
    };

    mockRepo.create.mockReturnValue(dto);
    mockRepo.save.mockResolvedValue({ id: 1, ...dto });

    const result = await service.create(dto as any);
    expect(result).toEqual({ id: 1, ...dto });
    expect(mockRepo.save).toHaveBeenCalled();
  });
});
