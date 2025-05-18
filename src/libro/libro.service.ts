import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Libro } from './libro/libro';
import { CreateLibroDto } from './dto/create-libro.dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto/update-libro.dto';

@Injectable()
export class LibroService {
  constructor(
    @InjectRepository(Libro)
    private readonly libroRepo: Repository<Libro>,
  ) {}

  async findAll(): Promise<Libro[]> {
    return this.libroRepo.find({ relations: ['bibliotecas'] });
  }

  async findOne(id: number): Promise<Libro> {
    const libro = await this.libroRepo.findOne({ where: { id }, relations: ['bibliotecas'] });
    if (!libro) {
      throw new NotFoundException(`Libro con id ${id} no encontrado`);
    }
    return libro;
  }

  async create(dto: CreateLibroDto): Promise<Libro> {
    this.validarFecha(dto.fechaPublicacion);
    const nuevo = this.libroRepo.create(dto);
    return this.libroRepo.save(nuevo);
  }

  async update(id: number, dto: UpdateLibroDto): Promise<Libro> {
    const libro = await this.findOne(id);

    if (dto.fechaPublicacion) {
      this.validarFecha(dto.fechaPublicacion);
    }

    Object.assign(libro, dto);
    return this.libroRepo.save(libro);
  }

  async delete(id: number): Promise<void> {
    const libro = await this.findOne(id);
    await this.libroRepo.remove(libro);
  }

  private validarFecha(fecha: string) {
    const fechaIngresada = new Date(fecha);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fechaIngresada > hoy) {
      throw new BadRequestException('La fecha de publicación no puede ser futura.');
    }
  }
}
