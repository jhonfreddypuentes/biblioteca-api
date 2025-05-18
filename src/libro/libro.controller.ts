import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { LibroService } from './libro.service';
import { CreateLibroDto } from './dto/create-libro.dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto/update-libro.dto';

@Controller('books')
export class LibroController {
  constructor(private readonly libroService: LibroService) {}

  @Get()
  findAll() {
    return this.libroService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.libroService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateLibroDto) {
    return this.libroService.create(dto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateLibroDto) {
    return this.libroService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.libroService.delete(id);
  }
}
