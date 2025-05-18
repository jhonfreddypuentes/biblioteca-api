import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BibliotecaLibroService } from './biblioteca-libro.service';
import { Biblioteca } from '../biblioteca/biblioteca/biblioteca';
import { Libro } from '../libro/libro/libro';
import { BibliotecaLibroController } from './biblioteca-libro.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Biblioteca, Libro])],
  providers: [BibliotecaLibroService],
  exports: [BibliotecaLibroService],
  controllers: [BibliotecaLibroController],
})
export class BibliotecaLibroModule {}
