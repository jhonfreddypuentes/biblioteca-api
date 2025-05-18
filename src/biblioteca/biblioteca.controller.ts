import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { BibliotecaService } from './biblioteca.service';
import { CreateBibliotecaDto } from './dto/create-biblioteca.dto/create-biblioteca.dto';
import { UpdateBibliotecaDto } from './dto/update-biblioteca.dto/update-biblioteca.dto';

@Controller('libraries')
export class BibliotecaController {
  constructor(private readonly bibliotecaService: BibliotecaService) {}

  @Get()
  findAll() {
    return this.bibliotecaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bibliotecaService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateBibliotecaDto) {
    return this.bibliotecaService.create(dto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBibliotecaDto) {
    return this.bibliotecaService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.bibliotecaService.delete(id);
  }
}
