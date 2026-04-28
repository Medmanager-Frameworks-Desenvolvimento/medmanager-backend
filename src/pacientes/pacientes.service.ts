import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { PrismaService } from 'src/database/prisma.service';
import { randomBytes } from 'crypto';

@Injectable()
export class PacientesService {
  constructor(private prisma: PrismaService) {}
  
  async create(idAdmin: string, data: CreatePacienteDto) {
    return await this.prisma.paciente.create({
      data: {
        ...data,
        id_admin: idAdmin, 
        doenca_cronica: data.doenca_cronica || [], 
      },
    });
  }

  async findAll(idAdmin: string) {
    return await this.prisma.paciente.findMany({
      where: { 
        id_admin: idAdmin, 
        deletedAt: null    
      }
    });
  }

  async findOne(idAdmin: string, id: number) {
    return await this.prisma.paciente.findUnique({
      where: {
        id_admin: idAdmin, 
        id,
        deletedAt: null  
      }
    });
  }

  async update(idAdmin: string, id: number, updatePacienteDto: UpdatePacienteDto) {
    const paciente = await this.prisma.paciente.findFirst({
      where: {
        id: id,
        id_admin: idAdmin,
        deletedAt: null,
      },
    });

    if (!paciente) {
      throw new NotFoundException('Paciente não encontrado ou acesso negado.');
    }

    return await this.prisma.paciente.update({
      where: { id: id },
      data: updatePacienteDto,
    });
  }

async remove(idAdmin: string, id: number) {
    const paciente = await this.prisma.paciente.findFirst({
      where: {
        id: id,
        id_admin: idAdmin,
        deletedAt: null, 
      },
    });

    if (!paciente) {
      throw new NotFoundException('Paciente não encontrado ou já foi removido.');
    }

    const hash = randomBytes(4).toString('hex');
    const sufixoExclusao = `_deletado_${Date.now()}_${hash}`;

    return await this.prisma.paciente.update({
      where: { id: id },
      data: { 
        deletedAt: new Date(),
        cpf: `${paciente.cpf}${sufixoExclusao}`
      },
    });
  }
}
