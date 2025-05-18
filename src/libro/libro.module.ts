import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Libro } from './libro/libro';
import { LibroService } from './libro.service';
import { LibroController } from './libro.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Libro])],
  exports: [TypeOrmModule],
  providers: [LibroService],
  controllers: [LibroController],
})
export class LibroModule {}
