import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnfermeiroDto } from './dto/create-enfermeiro.dto';
import { UpdateEnfermeiroDto } from './dto/update-enfermeiro.dto';
import { PrismaService } from 'src/database/prisma.service';
import { randomBytes } from 'crypto';

@Injectable()
export class EnfermeirosService {
  constructor(private prisma: PrismaService) {}

  async create(idAdmin: string, data: CreateEnfermeiroDto) {
    const enfermeiroExistente = await this.prisma.enfermeiro.findFirst({
      where: {
        id_admin: idAdmin,
        deletedAt: null,
        OR: [
          { cpf: data.cpf },
          { email: data.email },
        ],
      },
    });

    if (enfermeiroExistente) {
      if (enfermeiroExistente.cpf === data.cpf) {
        throw new ConflictException('Você já possui um enfermeiro cadastrado com este CPF.');
      }
      if (enfermeiroExistente.email === data.email) {
        throw new ConflictException('Este endereço de e-mail já está sendo usado por outro enfermeiro.');
      }
    }

    return await this.prisma.enfermeiro.create({
      data: {
        ...data,
        id_admin: idAdmin,
      },
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

    const hash = randomBytes(4).toString('hex');
    const sufixoExclusao = `_deletado_${Date.now()}_${hash}`;

    return await this.prisma.enfermeiro.update({
      where: { id: id },
      data: { 
        deletedAt: new Date(),
        email: `${enfermeiro.email}${sufixoExclusao}`,
        cpf: `${enfermeiro.cpf}${sufixoExclusao}`
      },
    });
  }
}
