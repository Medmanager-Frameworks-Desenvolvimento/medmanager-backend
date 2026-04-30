import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth} from '@nestjs/swagger'; 
import { EnfermeirosService } from './enfermeiros.service';
import { CreateEnfermeiroDto } from './dto/create-enfermeiro.dto';
import { UpdateEnfermeiroDto } from './dto/update-enfermeiro.dto';
import { CurrentAdmin } from 'src/common/decorators';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Enfermeiros') 
@ApiBearerAuth()
@UseGuards(AuthGuard) 
@Controller('enfermeiros')
export class EnfermeirosController {
  constructor(private readonly enfermeirosService: EnfermeirosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) 
  async create(
    @CurrentAdmin() admin: { sub: string },
    @Body() createEnfermeiroDto: CreateEnfermeiroDto
  ) {
    return this.enfermeirosService.create(admin.sub, createEnfermeiroDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK) 
  async findAll(@CurrentAdmin() admin: { sub: string }) {
    return this.enfermeirosService.findAll(admin.sub);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(
    @CurrentAdmin() admin: { sub: string },
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.enfermeirosService.findOne(admin.sub, id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @CurrentAdmin() admin: { sub: string },
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEnfermeiroDto: UpdateEnfermeiroDto
  ) {
    return this.enfermeirosService.update(admin.sub, id, updateEnfermeiroDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) 
  async remove(
    @CurrentAdmin() admin: { sub: string },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.enfermeirosService.remove(admin.sub, id);
  }
}
