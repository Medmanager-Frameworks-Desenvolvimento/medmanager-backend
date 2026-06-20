import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEnfermeiroDto {
  @ApiProperty({ 
    example: 'Maria Oliveira', 
    description: 'Nome completo do(a) enfermeiro(a).' 
  })
  @IsString({ message: 'O nome deve ser um texto válido' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MinLength(3, { message: 'O nome deve ter pelo menos 3 caracteres' })
  nome: string;

  @ApiProperty({ 
    example: '98765432109', 
    description: 'CPF válido do enfermeiro(a).' 
  })
  @IsString({ message: 'O CPF deve ser válido' })
  @IsNotEmpty({ message: 'O CPF é obrigatório' })
  cpf: string;

  @ApiProperty({ 
    example: 'maria.oliveira@clinica.com.br', 
    description: 'Endereço de e-mail para contato.' 
  })
  @IsEmail({}, { message: 'Forneça um endereço de e-mail válido' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  email: string;

  @ApiProperty({ 
    example: '11987654321', 
    description: 'Número de telefone celular ou fixo para contato.' 
  })
  @IsString({ message: 'O telefone deve ser válido' })
  @IsNotEmpty({ message: 'O telefone é obrigatório' })
  telefone: string;
}