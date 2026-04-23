import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMedicamentoDto } from './dto/create-medicamento.dto';
import { UpdateMedicamentoDto } from './dto/update-medicamento.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class MedicamentosService {
  constructor(private prisma: PrismaService) {}

  async create(idAdmin: string, data: CreateMedicamentoDto) {
    return await this.prisma.medicamento.create({
      data: {
        ...data,
        id_admin: idAdmin
      }
    });
  }

  async findAll(idAdmin: string) {
    return await this.prisma.medicamento.findMany({
      where: {
        id_admin: idAdmin,
        deletedAt: null
      }
    });
  }

  async findOne(idAdmin: string, id: number) {
    return await this.prisma.medicamento.findUnique({
      where: {
        id_admin: idAdmin,
        id,
        deletedAt: null
      }
    })
  }

  async update(idAdmin: string, id: number, updateMedicamentoDto: UpdateMedicamentoDto) {
    const medicamento = await this.prisma.medicamento.findFirst({
      where: {
        id: id,
        id_admin: idAdmin,
        deletedAt: null
      }
    });

    if (!medicamento) {
      throw new NotFoundException('Medicamento não encontrado ou acesso negado.');
    }

    return await this.prisma.medicamento.update({
      where: { id: id},
      data: updateMedicamentoDto,
    });
  }

  async remove(idAdmin: string, id: number) {
    const medicamento = await this.prisma.medicamento.findFirst({
      where: {
        id: id,
        id_admin: idAdmin,
        deletedAt: null
      }
    });

    if (!medicamento) {
      throw new NotFoundException('Medicamento não encontrado ou já foi removido.');
    }

    return await this.prisma.medicamento.update({
      where: { id: id },
      data: { 
        deletedAt: new Date() 
      },
    });
  }
}
