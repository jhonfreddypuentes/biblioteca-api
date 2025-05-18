import { Controller, Post, Get, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { BibliotecaLibroService } from './biblioteca-libro.service';

@Controller('libraries/:id/books')
export class BibliotecaLibroController {
  constructor(private readonly service: BibliotecaLibroService) {}

  @Post(':bookId')
  addBookToLibrary(
    @Param('id', ParseIntPipe) bibliotecaId: number,
    @Param('bookId', ParseIntPipe) libroId: number,
  ) {
    return this.service.addBookToLibrary(bibliotecaId, libroId);
  }

  @Get()
  findBooksFromLibrary(@Param('id', ParseIntPipe) bibliotecaId: number) {
    return this.service.findBooksFromLibrary(bibliotecaId);
  }

  @Get(':bookId')
  findBookFromLibrary(
    @Param('id', ParseIntPipe) bibliotecaId: number,
    @Param('bookId', ParseIntPipe) libroId: number,
  ) {
    return this.service.findBookFromLibrary(bibliotecaId, libroId);
  }

  @Put()
  updateBooksFromLibrary(
    @Param('id', ParseIntPipe) bibliotecaId: number,
    @Body() libroIds: number[], // ej: [1, 2, 3]
  ) {
    return this.service.updateBooksFromLibrary(bibliotecaId, libroIds);
  }

  @Delete(':bookId')
  deleteBookFromLibrary(
    @Param('id', ParseIntPipe) bibliotecaId: number,
    @Param('bookId', ParseIntPipe) libroId: number,
  ) {
    return this.service.deleteBookFromLibrary(bibliotecaId, libroId);
  }
}
