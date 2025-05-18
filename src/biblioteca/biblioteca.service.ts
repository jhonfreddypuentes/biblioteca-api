import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Biblioteca } from './biblioteca/biblioteca';
import { CreateBibliotecaDto } from './dto/create-biblioteca.dto/create-biblioteca.dto';
import { UpdateBibliotecaDto } from './dto/update-biblioteca.dto/update-biblioteca.dto';

@Injectable()
export class BibliotecaService {
  constructor(
    @InjectRepository(Biblioteca)
    private readonly bibliotecaRepo: Repository<Biblioteca>,
  ) {}

  async findAll(): Promise<Biblioteca[]> {
    return this.bibliotecaRepo.find({ relations: ['libros'] });
  }

  async findOne(id: number): Promise<Biblioteca> {
    const biblioteca = await this.bibliotecaRepo.findOne({ where: { id }, relations: ['libros'] });
    if (!biblioteca) {
      throw new NotFoundException(`Biblioteca con id ${id} no encontrada`);
    }
    return biblioteca;
  }

  async create(dto: CreateBibliotecaDto): Promise<Biblioteca> {
    this.validarHorario(dto.horaApertura, dto.horaCierre);

    const nueva = this.bibliotecaRepo.create(dto);
    return this.bibliotecaRepo.save(nueva);
  }

  async update(id: number, dto: UpdateBibliotecaDto): Promise<Biblioteca> {
    const biblioteca = await this.findOne(id);

    if (dto.horaApertura && dto.horaCierre) {
      this.validarHorario(dto.horaApertura, dto.horaCierre);
    }

    Object.assign(biblioteca, dto);
    return this.bibliotecaRepo.save(biblioteca);
  }

  async delete(id: number): Promise<void> {
    const biblioteca = await this.findOne(id);
    await this.bibliotecaRepo.remove(biblioteca);
  }

  private validarHorario(horaApertura: string, horaCierre: string) {
    const [hA, mA] = horaApertura.split(':').map(Number);
    const [hC, mC] = horaCierre.split(':').map(Number);

    const apertura = hA * 60 + mA;
    const cierre = hC * 60 + mC;

    if (apertura >= cierre) {
      throw new BadRequestException('La hora de apertura debe ser menor a la de cierre.');
    }
  }
}
