import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Admin, Prisma } from 'src/generated/prisma/client';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
    constructor(private prisma: PrismaService) {}

    async admin(
        adminWhereUniqueInput: Prisma.AdminWhereUniqueInput,
    ): Promise<Admin | null> {
        return await this.prisma.admin.findUnique({
            where: adminWhereUniqueInput,
        });
    }

    async create(createAdminDto: CreateAdminDto) {
        const emailJaEmUso = await this.prisma.admin.findUnique({
        where: { email: createAdminDto.email },
        });

        if (emailJaEmUso) {
        throw new ConflictException('Este e-mail já está cadastrado no sistema.');
        }
        
        const hashPassword = await bcrypt.hash(createAdminDto.senha, 12);
        
        return await this.prisma.admin.create({
        data: { 
            ...createAdminDto, 
            senha: hashPassword 
        }
        });
    }
    
    async update(id: string, data: UpdateAdminDto): Promise<Admin> {
        return this.prisma.admin.update({
            where: { id },
            data
        });
    }

    async findOne(id: string) {
        return await this.prisma.admin.findUnique({
            where: { id }
        });
    }

    async remove(where: Prisma.AdminWhereUniqueInput): Promise<Admin> {
        const admin = await this.prisma.admin.findUnique({ where });

        if (!admin) {
        throw new NotFoundException('Administrador não encontrado.');
        }

        const adminId = admin.id;

        return await this.prisma.$transaction(async (del) => {
        
        await del.prescricao.deleteMany({ where: { id_admin: adminId } });
        await del.medicamento.deleteMany({ where: { id_admin: adminId } });
        await del.enfermeiro.deleteMany({ where: { id_admin: adminId } });
        await del.paciente.deleteMany({ where: { id_admin: adminId } });
        return await del.admin.delete({ where: { id: adminId } });
        
        });
    }
}
