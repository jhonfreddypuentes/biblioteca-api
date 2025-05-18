import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Libro } from './libro/libro';

@Module({
  imports: [TypeOrmModule.forFeature([Libro])],
  exports: [TypeOrmModule],
})
export class LibroModule {}
