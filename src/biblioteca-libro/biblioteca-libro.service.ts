import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Biblioteca } from '../biblioteca/biblioteca/biblioteca';
import { Libro } from '../libro/libro/libro';
import { Repository } from 'typeorm';

@Injectable()
export class BibliotecaLibroService {

  constructor(
    @InjectRepository(Biblioteca)
    private readonly bibliotecaRepo: Repository<Biblioteca>,

    @InjectRepository(Libro)
    private readonly libroRepo: Repository<Libro>,
  ) {}

  async addBookToLibrary(bibliotecaId: number, libroId: number): Promise<Biblioteca> {
    const biblioteca = await this.bibliotecaRepo.findOne({ where: { id: bibliotecaId }, relations: ['libros'] });
    if (!biblioteca) throw new NotFoundException(`Biblioteca ${bibliotecaId} no encontrada`);

    const libro = await this.libroRepo.findOne({ where: { id: libroId } });
    if (!libro) throw new NotFoundException(`Libro ${libroId} no encontrado`);

    biblioteca.libros.push(libro);
    return this.bibliotecaRepo.save(biblioteca);
  }

  async findBooksFromLibrary(bibliotecaId: number): Promise<Libro[]> {
    const biblioteca = await this.bibliotecaRepo.findOne({ where: { id: bibliotecaId }, relations: ['libros'] });
    if (!biblioteca) throw new NotFoundException(`Biblioteca ${bibliotecaId} no encontrada`);
    return biblioteca.libros;
  }

  async findBookFromLibrary(bibliotecaId: number, libroId: number): Promise<Libro> {
    const libros = await this.findBooksFromLibrary(bibliotecaId);
    const libro = libros.find(l => l.id === libroId);
    if (!libro) throw new NotFoundException(`Libro ${libroId} no está asociado a la biblioteca ${bibliotecaId}`);
    return libro;
  }

  async updateBooksFromLibrary(bibliotecaId: number, librosIds: number[]): Promise<Biblioteca> {
    const biblioteca = await this.bibliotecaRepo.findOne({ where: { id: bibliotecaId }, relations: ['libros'] });
    if (!biblioteca) throw new NotFoundException(`Biblioteca ${bibliotecaId} no encontrada`);

    const libros = await this.libroRepo.findByIds(librosIds);
    if (libros.length !== librosIds.length) throw new NotFoundException(`Uno o más libros no existen`);

    biblioteca.libros = libros;
    return this.bibliotecaRepo.save(biblioteca);
  }

  async deleteBookFromLibrary(bibliotecaId: number, libroId: number): Promise<Biblioteca> {
    const biblioteca = await this.bibliotecaRepo.findOne({ where: { id: bibliotecaId }, relations: ['libros'] });
    if (!biblioteca) throw new NotFoundException(`Biblioteca ${bibliotecaId} no encontrada`);

    biblioteca.libros = biblioteca.libros.filter(libro => libro.id !== libroId);
    return this.bibliotecaRepo.save(biblioteca);
  }
}
