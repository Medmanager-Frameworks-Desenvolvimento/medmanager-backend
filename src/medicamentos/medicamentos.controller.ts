import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { MedicamentosService } from './medicamentos.service';
import { CreateMedicamentoDto } from './dto/create-medicamento.dto';
import { UpdateMedicamentoDto } from './dto/update-medicamento.dto';
import { CurrentAdmin } from 'src/common/decorators';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard) 
@Controller('medicamentos')
export class MedicamentosController {
  constructor(private readonly medicamentosService: MedicamentosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) 
  async create(
    @CurrentAdmin() admin: { sub: string },
    @Body() createMedicamentoDto: CreateMedicamentoDto
  ) {
    return this.medicamentosService.create(admin.sub, createMedicamentoDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK) 
  async findAll(@CurrentAdmin() admin: { sub: string }) {
    return this.medicamentosService.findAll(admin.sub);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(
    @CurrentAdmin() admin: { sub: string },
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.medicamentosService.findOne(admin.sub, id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @CurrentAdmin() admin: { sub: string },
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMedicamentoDto: UpdateMedicamentoDto
  ) {
    return this.medicamentosService.update(admin.sub, id, updateMedicamentoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) 
  async remove(
    @CurrentAdmin() admin: { sub: string },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.medicamentosService.remove(admin.sub, id);
  }
}
