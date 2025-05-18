import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Libro } from './libro/libro';
import { LibroService } from './libro.service';

@Module({
  imports: [TypeOrmModule.forFeature([Libro])],
  exports: [TypeOrmModule],
  providers: [LibroService],
})
export class LibroModule {}
