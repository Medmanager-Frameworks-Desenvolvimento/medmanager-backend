import { Body, Param, UseGuards, Controller, ValidationPipe, Post, Delete, Get, Patch, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Admin') 
@ApiBearerAuth()
@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) {}

    @Post('/signup')
    @Public()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body(new ValidationPipe()) adminData: CreateAdminDto) {
        return this.adminService.create(adminData);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id') id: string) {
        return this.adminService.findOne(id);
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id') id: string, 
        @Body(new ValidationPipe()) updateAdminDto: UpdateAdminDto 
    ) {
        return this.adminService.update(id, updateAdminDto);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: string) {
        await this.adminService.remove({ id: id });
        return;
    }
}