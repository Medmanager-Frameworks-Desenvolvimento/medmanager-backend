import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma.service';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signin({ email, senha }: SignInDto) {
    const admin = await this.prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      throw new UnauthorizedException('Admin não encontrado!');
    }

    const valid = await bcrypt.compare(senha, admin.senha);
    
    if (!valid) {
      throw new UnauthorizedException('Senha inválida');
    }

    const payload = { sub: admin.id };
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.SECRET_KEY, 
    });

    return {
      token,
      user: {
        id: admin.id,
        nome: admin.nome,
        email: admin.email,
      },
    };
  }
}