import { Injectable } from '@nestjs/common';
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

    async createAdmin(createAdminDto: CreateAdminDto) {
        const hashPassword = await bcrypt.hash(createAdminDto.senha, 12);
        const newAdmin = createAdminDto
        return await this.prisma.admin.create({
            data: {...newAdmin, senha: hashPassword }
        });
    }
    
    async updateAdmin(id: string, data: UpdateAdminDto): Promise<Admin> {
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

    async deleteAdmin(where: Prisma.AdminWhereUniqueInput): Promise<Admin> {
        return this.prisma.admin.delete({
            where
        });
    }
}
