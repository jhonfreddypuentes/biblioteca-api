import { Test, TestingModule } from '@nestjs/testing';
import { BibliotecaController } from '../biblioteca.controller';
import { BibliotecaService } from '../biblioteca.service';
import { CreateBibliotecaDto } from '../dto/create-biblioteca.dto/create-biblioteca.dto';

describe('BibliotecaController', () => {
  let controller: BibliotecaController;
  let service: BibliotecaService;

  const mockService = {
    findAll: jest.fn().mockResolvedValue([{ id: 1, nombre: 'Central' }]),
    findOne: jest.fn().mockResolvedValue({ id: 1, nombre: 'Central' }),
    create: jest.fn().mockResolvedValue({ id: 1, nombre: 'Central' }),
    update: jest.fn().mockResolvedValue({ id: 1, nombre: 'Actualizada' }),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BibliotecaController],
      providers: [{ provide: BibliotecaService, useValue: mockService }],
    }).compile();

    controller = module.get<BibliotecaController>(BibliotecaController);
    service = module.get<BibliotecaService>(BibliotecaService);
  });

  it('debe retornar todas las bibliotecas', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([{ id: 1, nombre: 'Central' }]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('debe retornar una biblioteca por ID', async () => {
    const result = await controller.findOne(1);
    expect(result).toEqual({ id: 1, nombre: 'Central' });
  });

  it('debe crear una biblioteca', async () => {
    const dto: CreateBibliotecaDto = {
      nombre: 'Central',
      direccion: 'Cra 10',
      ciudad: 'Bogotá',
      horaApertura: '08:00',
      horaCierre: '18:00',
    };
    const result = await controller.create(dto);
    expect(result).toEqual({ id: 1, nombre: 'Central' });
  });

  it('debe actualizar una biblioteca', async () => {
    const result = await controller.update(1, { nombre: 'Actualizada' });
    expect(result).toEqual({ id: 1, nombre: 'Actualizada' });
  });

  it('debe eliminar una biblioteca', async () => {
    await expect(controller.delete(1)).resolves.toBeUndefined();
  });
});
