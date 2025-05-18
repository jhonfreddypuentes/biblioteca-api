import { Module } from '@nestjs/common';
import { Biblioteca } from './biblioteca/biblioteca';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BibliotecaService } from './biblioteca.service';
import { BibliotecaController } from './biblioteca.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Biblioteca])],
  exports: [TypeOrmModule],
  providers: [BibliotecaService],
  controllers: [BibliotecaController],
})
export class BibliotecaModule {}
