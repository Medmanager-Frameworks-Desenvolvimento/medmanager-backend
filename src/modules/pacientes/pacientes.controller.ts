import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth} from '@nestjs/swagger';
import { PacientesService } from './pacientes.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { CurrentAdmin } from 'src/common/decorators';
import { AuthGuard } from 'src/modules/auth/auth.guard';

@ApiTags('Pacientes') 
@ApiBearerAuth()
@UseGuards(AuthGuard) 
@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) 
  async create(
    @CurrentAdmin() admin: { sub: string },
    @Body() createPacienteDto: CreatePacienteDto
  ) {
    return this.pacientesService.create(admin.sub, createPacienteDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK) 
  async findAll(@CurrentAdmin() admin: { sub: string }) {
    return this.pacientesService.findAll(admin.sub);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK) 
  async findOne(
    @CurrentAdmin() admin: { sub: string },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.pacientesService.findOne(admin.sub, id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @CurrentAdmin() admin: { sub: string },
    @Param('id', ParseIntPipe) id: number, 
    @Body() updatePacienteDto: UpdatePacienteDto,
  ) {
    return this.pacientesService.update(admin.sub, id, updatePacienteDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) 
  async remove(
    @CurrentAdmin() admin: { sub: string },
    @Param('id', ParseIntPipe) id: number, 
  ) {
    await this.pacientesService.remove(admin.sub, id);
    return;
  }
}