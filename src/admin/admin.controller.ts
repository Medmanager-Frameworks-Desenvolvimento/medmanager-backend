import {
    Body, 
    Param, 
    UseGuards,
    Controller, 
    ValidationPipe,
    Post, Delete, Get, Patch 
} from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { Admin } from 'src/generated/prisma/client';
import { AdminService } from './admin.service'
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) {}

    @Post('/signup')
    @Public()
    async create(@Body(new ValidationPipe()) adminData: CreateAdminDto): Promise<Admin> {
        return this.adminService.create(adminData)
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.adminService.findOne(id);
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    async update(
        @Param('id') id: string, 
        @Body(new ValidationPipe()) updateAdminDto: UpdateAdminDto 
    ): Promise<Admin> {
        return this.adminService.update(id, updateAdminDto);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Admin> {
        return this.adminService.remove({ id: id });
    }

}
