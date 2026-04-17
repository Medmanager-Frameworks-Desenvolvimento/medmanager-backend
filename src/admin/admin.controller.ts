import {
    Body, 
    Param,
    Controller, 
    ValidationPipe,
    Post, Delete, Get, Patch 
} from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { Admin } from 'src/generated/prisma/client';
import { AdminService } from './admin.service'
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) {}

    @Post('/signup')
    @Public()
    async signUpAdmin(@Body(new ValidationPipe()) adminData: CreateAdminDto): Promise<Admin> {
        return this.adminService.createAdmin(adminData)
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.adminService.findOne(id);
    }

    @Patch(':id')
    async updateAdmin(
        @Param('id') id: string, 
        @Body(new ValidationPipe()) updateAdminDto: UpdateAdminDto 
    ): Promise<Admin> {
        return this.adminService.updateAdmin(id, updateAdminDto);
    }

    @Delete(':id')
    async deleteAdmin(@Param('id') id: string): Promise<Admin> {
        return this.adminService.deleteAdmin({ id: id });
    }

}
