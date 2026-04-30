import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus, ParseIntPipe, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PrescricoesService } from './prescricoes.service';
import { CreatePrescricaoDto } from './dto/create-prescricao.dto';
import { UpdatePrescricaoDto } from './dto/update-prescricao.dto';
import { CurrentAdmin } from 'src/common/decorators';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Prescrições') 
@ApiBearerAuth()
@UseGuards(AuthGuard) 
@Controller('prescricoes')
export class PrescricoesController {
  constructor(private readonly prescricoesService: PrescricoesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) 
  async create(
    @CurrentAdmin() admin: { sub: string },
    @Body() createPrescricaoDto: CreatePrescricaoDto
  ) {
    return this.prescricoesService.create(admin.sub, createPrescricaoDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK) 
  async findAll(@CurrentAdmin() admin: { sub: string }) {
    return this.prescricoesService.findAll(admin.sub);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne( 
    @CurrentAdmin() admin: { sub: string },
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.prescricoesService.findOne(admin.sub, id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @CurrentAdmin() admin: { sub: string },
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePrescricaoDto: UpdatePrescricaoDto
  ) {
    return this.prescricoesService.update(admin.sub, id, updatePrescricaoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) 
  async remove(
    @CurrentAdmin() admin: { sub: string },
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.prescricoesService.remove(admin.sub, id);
    return; 
  }
}
