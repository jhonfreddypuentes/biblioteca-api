import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BibliotecaModule } from './biblioteca/biblioteca.module';
import { LibroModule } from './libro/libro.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Biblioteca } from './biblioteca/biblioteca/biblioteca';
import { Libro } from './libro/libro/libro';
import { BibliotecaLibroService } from './biblioteca-libro/biblioteca-libro.service';
import { BibliotecaLibroModule } from './biblioteca-libro/biblioteca-libro.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      synchronize: true,
      entities: [Biblioteca, Libro],
    }),
    BibliotecaModule, 
    LibroModule, 
    BibliotecaLibroModule
  ],
  controllers: [AppController],
  providers: [AppService, BibliotecaLibroService, BibliotecaLibroService]
})
export class AppModule {}
