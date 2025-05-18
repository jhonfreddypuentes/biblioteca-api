import { Module } from '@nestjs/common';
import { Biblioteca } from './biblioteca/biblioteca';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Biblioteca])],
  exports: [TypeOrmModule],
})
export class BibliotecaModule {}
