import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BibliotecaLibroService } from './biblioteca-libro.service';
import { Biblioteca } from 'src/biblioteca/biblioteca/biblioteca';
import { Libro } from 'src/libro/libro/libro';

@Module({
  imports: [TypeOrmModule.forFeature([Biblioteca, Libro])],
  providers: [BibliotecaLibroService],
  exports: [BibliotecaLibroService],
})
export class BibliotecaLibroModule {}
