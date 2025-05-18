import { Module } from '@nestjs/common';
import { Biblioteca } from './biblioteca/biblioteca';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BibliotecaService } from './biblioteca.service';

@Module({
  imports: [TypeOrmModule.forFeature([Biblioteca])],
  exports: [TypeOrmModule],
  providers: [BibliotecaService],
})
export class BibliotecaModule {}
