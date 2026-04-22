import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnfermeiroDto } from './dto/create-enfermeiro.dto';
import { UpdateEnfermeiroDto } from './dto/update-enfermeiro.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class EnfermeirosService {
  constructor(private prisma: PrismaService) {}

  async create(idAdmin: string, data: CreateEnfermeiroDto) {
    return await this.prisma.enfermeiro.create({
      data: {
        ...data,
        id_admin: idAdmin
      }
    });
  }

  async findAll(idAdmin: string) {
    return await this.prisma.enfermeiro.findMany({
      where: {
        id_admin: idAdmin,
        deletedAt: null
      }
    });
  }

  async findOne(idAdmin: string, id: number) {
    return await this.prisma.enfermeiro.findUnique({
      where: {
        id_admin: idAdmin,
        id,
        deletedAt: null
      }
    })
  }

  async update(idAdmin: string, id: number, updateEnfermeiroDto: UpdateEnfermeiroDto) {
    const enfermeiro = await this.prisma.enfermeiro.findFirst({
      where: {
        id: id,
        id_admin: idAdmin,
        deletedAt: null
      }
    });

    if (!enfermeiro) {
      throw new NotFoundException('Enfermeiro não encontrado ou acesso negado.');
    }

    return await this.prisma.enfermeiro.update({
      where: { id: id},
      data: updateEnfermeiroDto,
    });
  }

  async remove(idAdmin: string, id: number) {
    const enfermeiro = await this.prisma.enfermeiro.findFirst({
      where: {
        id: id,
        id_admin: idAdmin,
        deletedAt: null
      }
    });

    if (!enfermeiro) {
      throw new NotFoundException('Enfermeiro não encontrado ou já foi removido.');
    }

    return await this.prisma.enfermeiro.update({
      where: { id: id },
      data: { 
        deletedAt: new Date() 
      },
    });
  }
}
