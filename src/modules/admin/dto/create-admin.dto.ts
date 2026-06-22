import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty({ 
    example: 'Mateus Administrador', 
    description: 'Nome completo do administrador da clínica.' 
  })
  @IsString({ message: 'O nome deve ser um texto válido' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MinLength(3, { message: 'O nome deve ter pelo menos 3 caracteres' })
  nome: string;

  @ApiProperty({ 
    example: 'admin@clinica.com.br', 
    description: 'Endereço de e-mail usado para login no sistema.' 
  })
  @IsEmail({}, { message: 'Forneça um endereço de e-mail válido' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  email: string;

  @ApiProperty({ 
    example: 'SenhaForte123', 
    description: 'Senha de acesso do administrador (mínimo de 6 e máximo de 20 caracteres).' 
  })
  @IsString()
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @MaxLength(20, { message: 'A senha deve ter no máximo 20 caracteres' })
  senha: string;
}